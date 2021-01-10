<?php

namespace App\Http\Controllers;

use App\Http\Controllers\API\AuthController;
use App\Models\Token;
use App\Models\User;
use Google_Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;

class GoogleAuthController extends Controller
{
    public function verify(Request $request)
    {
        $data = $request->validate([
            'id_token' => ['required', 'string'],
            'google_id' => ['required'],
        ]);

        $id_token = $data['id_token'];
        $google_id = $data['google_id'];

        $client = new Google_Client(['client_id' => env("GOOGLE_CLIENT_ID")]);
        $payload = $client->verifyIdToken($id_token);

        if ($payload && $payload['email_verified']) {
            $user = User::where('email', '=', $payload['email'])->first();
            if ($user) {
                $user['token'] = $user->token;
                return $user;
            } else {
                $user = User::create([
                    'email' => $payload['email'],
                    'image_url' => $payload['picture'],
                    'name' => $payload['given_name'] . ' ' . $payload['family_name'],
                    'password' => Hash::make($google_id),
                ]);

                // get the token
                $auth = new AuthController();
                $token_string = $auth->login(new Request([
                    "email" => $payload["email"],
                    "password" => $google_id
                ]));

                $token = Token::create(["token" => $token_string]);

                $user->token_id = $token->id;

                $user->save();

                $user['token'] = $user->token;

                return $user;
            }
        } else {
            return 'invalid';
        }
    }
}
