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
        let serial_limit = {!! json_encode($serial_limit, JSON_HEX_TAG) !!}
    </script>

</head>


<body>
    <div id="add_quiz"></div>


    <script src="/js/react/pages/AddQuiz.js" defer></script>
</body>

</html>