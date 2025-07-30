<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'Juanpasabuyph') }}</title>
    <x-seo::meta />
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
    @inertiaHead
    <style>
        .menu-open {
            display: block !important;
        }

        .add-to-cart-button:hover .add-to-cart-text {
            display: none;
        }

        .add-to-cart-button .add-to-cart-text-hover {
            display: none;
        }

        .add-to-cart-button:hover .add-to-cart-text-hover {
            display: inline;
        }
    </style>
</head>

<body class="font-sans antialiased plus-jakarta-sans-font">
    @inertia
</body>

</html>