const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.react('resources/js/app.js', 'public/js')
    .react('resources/js/react/pages/AddQuiz/app.js', 'public/js/react/pages/AddQuiz.js')
    .react('resources/js/react/pages/EditQuiz/app.js', 'public/js/react/pages/EditQuiz.js')
    .react('resources/js/react/pages/Quizzes/app.js', 'public/js/react/pages/Quizzes.js')
    .react('resources/js/react/pages/AddQuestions/app.js', 'public/js/react/pages/AddQuestions.js')
    .react('resources/js/react/pages/EditQuestions/app.js', 'public/js/react/pages/EditQuestions.js')
    .react('resources/js/react/pages/Questions/app.js', 'public/js/react/pages/Questions.js')
    .sass('resources/sass/app.scss', 'public/css');
mix.js('resources/js/canvas-ui/app.js', 'public/js/canvas-ui.js').sass(
    'resources/sass/canvas-ui.scss',
    'public/css/canvas-ui.css'
);
