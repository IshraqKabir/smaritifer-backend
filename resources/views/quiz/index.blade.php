<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Smartifier</title>

    <script>
        let token = {!! json_encode($auth_token, JSON_HEX_TAG) !!}
    </script>

</head>


<body>
    <div id="quizzes"></div>


    <script src="/js/react/pages/Quizzes.js" defer></script>
</body>

</html>