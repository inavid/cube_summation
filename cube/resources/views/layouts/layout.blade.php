<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}" />
        <title>Rappi - @yield('title')</title>
        @section('styles')
            <link href="{{{ asset('/css/bootstrap.min.css') }}}" rel="stylesheet">
        @show()
    </head>
    <body>
        @section('scripts')
            @section('js')
            <script src="{{{ asset('/js/jquery-3.1.1.min.js') }}}"></script>
            @show()
        @show()

        <div class="container">
            @yield('content')
        </div>
    </body>
</html>