/**
 * Словарь строк интерфейса (раздел мультиязычности).
 * Контент (история, объекты, блюда) хранится отдельно в data/ и data/en/.
 */
const strings = {
  ru: {
    // nav / header
    'nav.home': 'Главная',
    'nav.history': 'История',
    'nav.kitchen': 'Кухня',
    'nav.routes': 'Маршруты',
    'auth.signIn': 'Вход',
    'auth.logoutTitle': 'Выйти из аккаунта',

    // hero
    'hero.line1': 'Культурное наследие',
    'hero.line2': 'Северного Кавказа',
    'hero.subtitle':
      'Путеводитель по историко-культурному наследию республик Северного Кавказа. Маршруты, история, национальная кухня — всё в одном месте',
    'hero.cta': 'Начать исследовать',

    // section selector
    'sections.choose': 'Выберите раздел',
    'sections.go': 'Перейти в раздел',
    'sections.kitchen': [
      'Когда солнце освещает кавказские вершины, а лёгкий ветерок приносит аромат свежей выпечки.',
      'Начинается настоящее гастрономическое путешествие.',
    ],
    'sections.history': [
      'Древние башни, крепости и памятники — немые свидетели тысячелетий.',
      'Каждый регион Северного Кавказа хранит свою уникальную историю, которую можно увидеть и почувствовать.',
    ],
    'sections.routes': [
      'Сулакский каньон, Эльбрус, аулы-призраки — маршруты, которые останутся в памяти навсегда.',
      'Постройте своё путешествие по самым живописным местам Кавказа.',
    ],

    // footer
    'footer.aboutTitle': 'О проекте',
    'footer.aboutText':
      'Caucasus Heritage — проект о культурном и историческом наследии Северного Кавказа: архитектурные памятники, традиционная кухня и туристические маршруты республик региона.',
    'footer.copy': '© Caucasus Heritage, 2026',
    'footer.links': 'Контакты · О проекте · Политика конфиденциальности',

    // listing pages
    'common.subtitleRegion': 'Северного Кавказа',
    'history.title': 'История',
    'history.lead':
      'Выберите республику, чтобы изучить её историко-культурные памятники, события и значимых деятелей.',
    'kitchen.title': 'Национальная кухня',
    'kitchen.lead':
      'Выберите республику, чтобы посмотреть традиционные блюда, рецепты и заведения национальной кухни.',
    'routes.title': 'Маршруты',
    'routes.lead':
      'Выберите республику, чтобы построить собственный маршрут по её природным и культурным объектам на интерактивной карте.',

    // cards
    'card.go': 'Перейти',
    'card.buildRoute': 'Построить маршрут',
    'card.routeDesc': 'объектов на карте — постройте свой маршрут по республике',

    // republic history page
    'rh.eyebrow': 'История',
    'rh.chronology': 'Хронология',
    'rh.figures': 'Знаковые личности',
    'rh.facts': 'Интересные факты',
    'rh.monuments': 'Историко-культурные памятники',
    'rh.ctaTitle': 'Постройте маршрут по республике {name}',
    'rh.ctaText': 'Отметьте интересные объекты на карте и соберите собственный маршрут.',
    'rh.ctaBtn': 'Построить маршрут',

    // republic kitchen page
    'rk.eyebrow': 'Национальная кухня',
    'rk.dishes': 'Традиционные блюда',
    'rk.whereToEat': 'Где попробовать',
    'rk.ctaTitle': 'Узнайте больше об истории {name}',
    'rk.ctaText': 'Историко-культурные памятники, знаковые личности и природа республики.',
    'rk.ctaBtn': 'Перейти к истории',

    // route builder
    'rb.title': 'Построение маршрута',
    'rb.reset': 'Сбросить',
    'rb.save': 'Сохранить маршрут',
    'rb.saved': 'Сохранено ✓',
    'rb.points': 'Точки маршрута',
    'rb.hint': 'Кликайте по меткам на карте, чтобы добавить объект в маршрут',
    'rb.addNext': 'Добавьте следующую точку с карты',
    'rb.params': 'Параметры маршрута',
    'rb.paramPoints': 'Точек:',
    'rb.paramDistance': 'Расстояние:',
    'rb.paramDuration': 'Длительность:',
    'rb.build': 'Построить маршрут',
    'rb.built': 'Маршрут построен',
    'rb.notFound': 'Республика не найдена.',
    'rb.backToRoutes': '← Ко всем маршрутам',
    'rb.km': 'км',

    // map / popups
    'map.natural': 'Природный объект',
    'map.cultural': 'Культурный объект',
    'map.add': 'Добавить в маршрут',
    'map.remove': 'Убрать из маршрута',

    // detail not found
    'detail.notFound': 'Республика не найдена.',
    'detail.backHistory': '← Ко всем республикам',
    'detail.backKitchen': '← Ко всем республикам',

    // theme
    'theme.toLight': 'Светлая тема',
    'theme.toDark': 'Тёмная тема',

    // reviews / feedback
    'reviews.title': 'Отзывы',
    'reviews.leave': 'Оставить отзыв',
    'reviews.rating': 'Ваша оценка',
    'reviews.placeholder': 'Поделитесь впечатлениями о республике, её истории и местах…',
    'reviews.submit': 'Отправить отзыв',
    'reviews.loginPrompt': 'Войдите в аккаунт, чтобы оставить отзыв',
    'reviews.empty': 'Пока нет отзывов. Будьте первым!',
    'reviews.thanks': 'Спасибо! Ваш отзыв опубликован.',
    'reviews.errRating': 'Поставьте оценку',
    'reviews.errText': 'Напишите отзыв (минимум 5 символов)',
    'reviews.you': 'Вы',

    // auth modal
    'am.createTitle': 'Создать аккаунт',
    'am.createSubtitle': 'Регистрация необязательна, но без неё нельзя оставлять отзывы и сохранять маршруты.',
    'am.loginTitle': 'Войти в аккаунт',
    'am.loginSubtitle': 'Введите логин и пароль, чтобы продолжить',
    'am.ph.name': 'Имя',
    'am.ph.email': 'Введите почту@example.com',
    'am.ph.login': 'Логин *Латинские буквы и цифры',
    'am.ph.password': 'Пароль *Минимум 8 символов',
    'am.ph.identifier': 'Логин или email',
    'am.ph.passwordLogin': 'Пароль',
    'am.agree': 'Я согласен с условиями использования и политикой конфиденциальности',
    'am.remember': 'Запомнить меня',
    'am.forgot': 'Забыли пароль?',
    'am.register': 'Зарегистрироваться',
    'am.login': 'Войти',
    'am.haveAccount': 'Уже есть аккаунт? ',
    'am.noAccount': 'Нет аккаунта? ',
    'am.close': 'Закрыть',

    // auth errors
    'err.name_required': 'Введите имя',
    'err.email_invalid': 'Некорректная почта',
    'err.login_invalid': 'Только латинские буквы и цифры',
    'err.password_short': 'Минимум 8 символов',
    'err.agree_required': 'Подтвердите согласие с условиями',
    'err.login_taken': 'Этот логин уже занят',
    'err.email_taken': 'Эта почта уже зарегистрирована',
    'err.identifier_required': 'Введите логин или почту',
    'err.password_required': 'Введите пароль',
    'err.invalid_credentials': 'Неверный логин или пароль',
  },

  en: {
    'nav.home': 'Home',
    'nav.history': 'History',
    'nav.kitchen': 'Cuisine',
    'nav.routes': 'Routes',
    'auth.signIn': 'Sign in',
    'auth.logoutTitle': 'Log out',

    'hero.line1': 'Cultural Heritage',
    'hero.line2': 'of the North Caucasus',
    'hero.subtitle':
      'A guide to the historical and cultural heritage of the North Caucasus republics. Routes, history and national cuisine — all in one place',
    'hero.cta': 'Start exploring',

    'sections.choose': 'Choose a section',
    'sections.go': 'Go to section',
    'sections.kitchen': [
      'When the sun lights up the Caucasus peaks and a light breeze carries the aroma of fresh baking.',
      'A real gastronomic journey begins.',
    ],
    'sections.history': [
      'Ancient towers, fortresses and monuments — silent witnesses of millennia.',
      'Every region of the North Caucasus keeps its own unique history that you can see and feel.',
    ],
    'sections.routes': [
      'The Sulak Canyon, Elbrus, ghost villages — routes that stay in your memory forever.',
      'Plan your own journey through the most scenic places of the Caucasus.',
    ],

    'footer.aboutTitle': 'About the project',
    'footer.aboutText':
      'Caucasus Heritage is a project about the cultural and historical heritage of the North Caucasus: architectural landmarks, traditional cuisine and tourist routes of the region’s republics.',
    'footer.copy': '© Caucasus Heritage, 2026',
    'footer.links': 'Contacts · About · Privacy policy',

    'common.subtitleRegion': 'of the North Caucasus',
    'history.title': 'History',
    'history.lead':
      'Choose a republic to explore its historical and cultural landmarks, events and notable figures.',
    'kitchen.title': 'National cuisine',
    'kitchen.lead':
      'Choose a republic to see traditional dishes, recipes and restaurants of the national cuisine.',
    'routes.title': 'Routes',
    'routes.lead':
      'Choose a republic to build your own route across its natural and cultural sites on an interactive map.',

    'card.go': 'Open',
    'card.buildRoute': 'Build a route',
    'card.routeDesc': 'sites on the map — build your own route across the republic',

    'rh.eyebrow': 'History',
    'rh.chronology': 'Timeline',
    'rh.figures': 'Notable figures',
    'rh.facts': 'Interesting facts',
    'rh.monuments': 'Historical & cultural landmarks',
    'rh.ctaTitle': 'Build a route across {name}',
    'rh.ctaText': 'Mark the sites you like on the map and put together your own route.',
    'rh.ctaBtn': 'Build a route',

    'rk.eyebrow': 'National cuisine',
    'rk.dishes': 'Traditional dishes',
    'rk.whereToEat': 'Where to try',
    'rk.ctaTitle': 'Learn more about the history of {name}',
    'rk.ctaText': 'Historical and cultural landmarks, notable figures and the nature of the republic.',
    'rk.ctaBtn': 'Go to history',

    'rb.title': 'Route builder',
    'rb.reset': 'Reset',
    'rb.save': 'Save route',
    'rb.saved': 'Saved ✓',
    'rb.points': 'Route points',
    'rb.hint': 'Click the markers on the map to add a site to your route',
    'rb.addNext': 'Add the next point from the map',
    'rb.params': 'Route parameters',
    'rb.paramPoints': 'Points:',
    'rb.paramDistance': 'Distance:',
    'rb.paramDuration': 'Duration:',
    'rb.build': 'Build route',
    'rb.built': 'Route built',
    'rb.notFound': 'Republic not found.',
    'rb.backToRoutes': '← Back to all routes',
    'rb.km': 'km',

    'map.natural': 'Natural site',
    'map.cultural': 'Cultural site',
    'map.add': 'Add to route',
    'map.remove': 'Remove from route',

    'detail.notFound': 'Republic not found.',
    'detail.backHistory': '← Back to all republics',
    'detail.backKitchen': '← Back to all republics',

    'theme.toLight': 'Light theme',
    'theme.toDark': 'Dark theme',

    'reviews.title': 'Reviews',
    'reviews.leave': 'Leave a review',
    'reviews.rating': 'Your rating',
    'reviews.placeholder': 'Share your impressions of the republic, its history and places…',
    'reviews.submit': 'Submit review',
    'reviews.loginPrompt': 'Sign in to leave a review',
    'reviews.empty': 'No reviews yet. Be the first!',
    'reviews.thanks': 'Thank you! Your review has been published.',
    'reviews.errRating': 'Please set a rating',
    'reviews.errText': 'Write a review (at least 5 characters)',
    'reviews.you': 'You',

    'am.createTitle': 'Create an account',
    'am.createSubtitle': 'Registration is optional, but without it you cannot leave reviews or save routes.',
    'am.loginTitle': 'Sign in',
    'am.loginSubtitle': 'Enter your login and password to continue',
    'am.ph.name': 'Name',
    'am.ph.email': 'Enter your email@example.com',
    'am.ph.login': 'Login *Latin letters and digits',
    'am.ph.password': 'Password *At least 8 characters',
    'am.ph.identifier': 'Login or email',
    'am.ph.passwordLogin': 'Password',
    'am.agree': 'I agree to the terms of use and privacy policy',
    'am.remember': 'Remember me',
    'am.forgot': 'Forgot password?',
    'am.register': 'Sign up',
    'am.login': 'Sign in',
    'am.haveAccount': 'Already have an account? ',
    'am.noAccount': 'No account yet? ',
    'am.close': 'Close',

    'err.name_required': 'Enter your name',
    'err.email_invalid': 'Invalid email',
    'err.login_invalid': 'Latin letters and digits only',
    'err.password_short': 'At least 8 characters',
    'err.agree_required': 'Please accept the terms',
    'err.login_taken': 'This login is already taken',
    'err.email_taken': 'This email is already registered',
    'err.identifier_required': 'Enter your login or email',
    'err.password_required': 'Enter your password',
    'err.invalid_credentials': 'Invalid login or password',
  },
};

export default strings;
