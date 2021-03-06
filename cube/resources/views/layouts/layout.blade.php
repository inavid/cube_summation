<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}" />
        <title>Rappi - @yield('title')</title>
        @section('styles')
            <link href="{{{ asset('/bootstrap/css/bootstrap.min.css') }}}" rel="stylesheet">
        @show()
    </head>
    <body>
        @section('scripts')
            <script src="{{{ asset('/js/jquery-3.1.1.min.js') }}}"></script>
            <script src="{{{ asset('/bootstrap/js/bootstrap.min.js') }}}"></script>
            <script src="{{{ asset('/js/bootbox.min.js') }}}"></script>
            @section('js')
            @show()
        @show()

        <div class="container">
            @yield('content')
        </div>
    </body>
</html>