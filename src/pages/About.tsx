// src/pages/About.tsx

import React from 'react';
import { useApp } from '../contexts/AppContext';
import { useTranslation } from '../hooks/useTranslation';
import { bibleBooks } from '../data/bibleBooks';
import { getBookAbbreviation } from '../utils/readingLabels';
import {
  Shuffle,
  Search as SearchIcon,
  Mail,
  BookOpen,
  Languages,
  Smartphone,
  Settings as SettingsIcon,
} from 'lucide-react';

/** Tailles fixes du contenu */
const H2_PX = 20;
const TEXT_PX = 17;

const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=fr.theword.www.twa';
const GOOGLE_PLAY_QR = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWgAAAFoAQAAAABSnlx4AAAChklEQVR4nO2by27rMAxEZy7y/7987oIP2csCVirVSoA0ts9iwAgjkmKNfvD69xP40Ic+9KEPPZH+SJLjO8bENZak8PZ6OlnJm2gAJDnfshCyJI+n6+nej/7EH8f6RTJWhlpY+TPoxHsCjTO0dqaJlJt8Wck76I4tsmTSxn9ByZ+l009iOWMTUScuhs3MV/IOOuKdy9g4V7UxIq/HIl9H9660b/W8xUgGHQG/Auvo3pWO/LvWMI5lnWmKMDJqY1lH9660iY8odWJtV3TjfroNs5W8g/YIrBWxxSP/DkexIvAL6d6bRkYQxWRGu01FEvaXlPx1uvbLdOt2lrgXMafBdXTvThO2Hb2TbKFIdhT3Pv79EO3RH8mdUuXYUm6go1m4ju5d6faObMZ2Pp5L2vTPMFnJO+iqLyvtU3YHweokpdf7Orq3pjPtjup9dExMlZs+/e8naVDukUTUJQu6O+i4t5zubenaELGVFY7lKi9pV19N96Z05SdULe/wFFPJ4ckHH6LdeV/X9t1A6TZVl0Dr6N6adlQ5UfAgGRir2lF2fkXJS2jqsFju3BARJkLdXE/3fvToD2ZjUPfu96WdMlnJi+jIuhG4O+A9j5L9k+8oeQntaFXVIU8aTE389MdyunelwYbsTblLeVNWfvKTh+iar+pRn7Ttyr3r6TlveIa+nc+PQ8zuCOq2Z66je1f6Nh+rbhNej3ZMpS4L6d6VDj+pwlKdeZeh0LNXs5W8irYr2kTTquLufMTJTybQsUNCzw/GBtojbavq3of+XC8o+7iOxvbJz2Qlr6LrHxguh/PkMpfGGPhyurej7/OxWVy6pjZRT6Qc/36Evs/H/qaSQx/60Ic+9E9e/wFSYTPpMoQosgAAAABJRU5ErkJggg==';

const ANDROID_LABELS: Record<string, readonly [string, string, string]> = {
  "fr": [
    "The Word sur Android",
    "Télécharger sur Google Play",
    "Scannez ce QR code avec votre téléphone Android."
  ],
  "en": [
    "The Word on Android",
    "Get it on Google Play",
    "Scan this QR code with your Android phone."
  ],
  "es": [
    "The Word en Android",
    "Descargar en Google Play",
    "Escanea este código QR con tu teléfono Android."
  ],
  "de": [
    "The Word für Android",
    "Bei Google Play herunterladen",
    "Scanne diesen QR-Code mit deinem Android-Smartphone."
  ],
  "it": [
    "The Word su Android",
    "Scarica su Google Play",
    "Scansiona questo codice QR con il tuo telefono Android."
  ],
  "pt": [
    "The Word no Android",
    "Baixar no Google Play",
    "Leia este código QR com seu celular Android."
  ],
  "ru": [
    "The Word для Android",
    "Скачать в Google Play",
    "Отсканируйте этот QR-код телефоном Android."
  ],
  "ar": [
    "The Word على Android",
    "تنزيل من Google Play",
    "امسح رمز QR هذا بهاتف Android."
  ],
  "hi": [
    "Android पर The Word",
    "Google Play से डाउनलोड करें",
    "अपने Android फ़ोन से यह QR कोड स्कैन करें।"
  ],
  "id": [
    "The Word di Android",
    "Unduh di Google Play",
    "Pindai kode QR ini dengan ponsel Android Anda."
  ],
  "ja": [
    "Android 版 The Word",
    "Google Play でダウンロード",
    "Android スマートフォンでこの QR コードを読み取ってください。"
  ],
  "ko": [
    "Android용 The Word",
    "Google Play에서 다운로드",
    "Android 휴대전화로 이 QR 코드를 스캔하세요."
  ],
  "sw": [
    "The Word kwenye Android",
    "Pakua kwenye Google Play",
    "Changanua msimbo huu wa QR kwa simu yako ya Android."
  ],
  "tr": [
    "Android için The Word",
    "Google Play’den indir",
    "Bu QR kodunu Android telefonunuzla tarayın."
  ],
  "yo": [
    "The Word lórí Android",
    "Ṣe ìgbàsílẹ̀ láti Google Play",
    "Fi fóònù Android rẹ ṣe àyẹ̀wò kóòdù QR yìí."
  ],
  "zh": [
    "Android 版 The Word",
    "在 Google Play 下载",
    "使用 Android 手机扫描此二维码。"
  ],
  "he": [
    "The Word ל־Android",
    "הורדה מ־Google Play",
    "סרקו את קוד ה־QR הזה באמצעות טלפון Android."
  ],
  "el": [
    "The Word για Android",
    "Λήψη από το Google Play",
    "Σαρώστε αυτόν τον κωδικό QR με το τηλέφωνό σας Android."
  ]
};

type WidgetHelpCopy = {
  title: string;
  description: string;
  install: string;
  customize: string;
  timing: string;
  verse: string;
  refresh: string;
  settings: string;
};

const WIDGET_HELP: Record<string, WidgetHelpCopy> = {
  "fr": {
    "title": "Widget Android",
    "description": "Affichez un verset aléatoire sur l’écran d’accueil de votre téléphone, même hors connexion. Touchez le verset pour l’ouvrir directement dans Lecture.",
    "install": "Pour l’ajouter, faites un appui long sur l’icône The Word, puis choisissez Widgets et ajoutez le widget. Selon votre téléphone, vous pouvez aussi faire un appui long sur un espace vide de l’écran d’accueil, puis choisir Widgets → The Word.",
    "customize": "Dans les paramètres du widget, choisissez la langue, la taille du texte et le renouvellement : toutes les 15, 30 ou 60 minutes, ou uniquement manuellement. Le bouton « Nouveau verset » permet de changer de verset à tout moment.",
    "timing": "Android peut retarder le renouvellement automatique pour économiser la batterie.",
    "verse": "Au commencement, Dieu créa les cieux et la terre.",
    "refresh": "Nouveau Verset",
    "settings": "Paramètres"
  },
  "en": {
    "title": "Android widget",
    "description": "Display a random verse on your phone’s home screen, even offline. Tap the verse to open it directly in Reading.",
    "install": "To add it, touch and hold the The Word app icon, choose Widgets and add the widget. Depending on your phone, you can also touch and hold an empty area of the home screen, then choose Widgets → The Word.",
    "customize": "In the widget settings, choose the language, text size and refresh interval: every 15, 30 or 60 minutes, or manually only. Tap “New verse” to change the verse at any time.",
    "timing": "Android may delay automatic refreshes to save battery.",
    "verse": "In the beginning God created the heaven and the earth.",
    "refresh": "New Verse",
    "settings": "Settings"
  },
  "de": {
    "title": "Android-Widget",
    "description": "Zeigen Sie einen zufälligen Bibelvers auf dem Startbildschirm Ihres Smartphones an, auch offline. Tippen Sie auf den Vers, um ihn direkt in der Leseansicht zu öffnen.",
    "install": "Halten Sie das App-Symbol von The Word gedrückt, wählen Sie Widgets und fügen Sie das Widget hinzu. Je nach Smartphone können Sie auch eine freie Stelle auf dem Startbildschirm gedrückt halten und dann Widgets → The Word wählen.",
    "customize": "Wählen Sie in den Widget-Einstellungen Sprache, Schriftgröße und Aktualisierung: alle 15, 30 oder 60 Minuten oder nur manuell. Mit „Neuer Vers“ können Sie den Vers jederzeit wechseln.",
    "timing": "Android kann automatische Aktualisierungen verzögern, um Akku zu sparen.",
    "verse": "Am Anfang schuf Gott Himmel und Erde.",
    "refresh": "Neuer Vers",
    "settings": "Einstellungen"
  },
  "es": {
    "title": "Widget de Android",
    "description": "Muestra un versículo aleatorio en la pantalla de inicio del teléfono, incluso sin conexión. Toca el versículo para abrirlo directamente en Lectura.",
    "install": "Para añadirlo, mantén pulsado el icono de The Word, selecciona Widgets y añade el widget. Según el teléfono, también puedes mantener pulsado un espacio vacío de la pantalla de inicio y elegir Widgets → The Word.",
    "customize": "En los ajustes del widget, elige el idioma, el tamaño del texto y la actualización: cada 15, 30 o 60 minutos, o solo manualmente. Toca «Nuevo versículo» para cambiarlo en cualquier momento.",
    "timing": "Android puede retrasar las actualizaciones automáticas para ahorrar batería.",
    "verse": "EN el principio crió Dios los cielos y la tierra.",
    "refresh": "Nuevo versículo",
    "settings": "Ajustes"
  },
  "it": {
    "title": "Widget Android",
    "description": "Mostra un versetto casuale sulla schermata iniziale del telefono, anche offline. Tocca il versetto per aprirlo direttamente in Lettura.",
    "install": "Per aggiungerlo, tieni premuta l’icona di The Word, scegli Widget e aggiungi il widget. A seconda del telefono, puoi anche tenere premuto uno spazio vuoto nella schermata iniziale, quindi scegliere Widget → The Word.",
    "customize": "Nelle impostazioni del widget, scegli la lingua, la dimensione del testo e l’aggiornamento: ogni 15, 30 o 60 minuti, oppure solo manuale. Tocca «Nuovo versetto» per cambiarlo in qualsiasi momento.",
    "timing": "Android può ritardare gli aggiornamenti automatici per risparmiare batteria.",
    "verse": "Nel principio Iddio creò i cieli e la terra.",
    "refresh": "Nuovo versetto",
    "settings": "Impostazioni"
  },
  "pt": {
    "title": "Widget Android",
    "description": "Veja um versículo aleatório no ecrã inicial do telemóvel, mesmo sem ligação à Internet. Toque no versículo para o abrir diretamente na Leitura.",
    "install": "Para o adicionar, mantenha premido o ícone do The Word, escolha Widgets e adicione o widget. Consoante o telemóvel, também pode manter premido um espaço vazio do ecrã inicial e escolher Widgets → The Word.",
    "customize": "Nas definições do widget, escolha o idioma, o tamanho do texto e a atualização: a cada 15, 30 ou 60 minutos, ou apenas manualmente. Toque em «Novo versículo» para o mudar a qualquer momento.",
    "timing": "O Android pode atrasar as atualizações automáticas para poupar bateria.",
    "verse": "No início, Deus criou os céus e a terra.",
    "refresh": "Novo verso",
    "settings": "Configurações"
  },
  "ru": {
    "title": "Виджет Android",
    "description": "Разместите случайный стих на главном экране телефона, даже без интернета. Нажмите на стих, чтобы открыть его прямо на странице чтения.",
    "install": "Чтобы добавить виджет, нажмите и удерживайте значок The Word, выберите «Виджеты» и добавьте его. На некоторых телефонах можно также удерживать свободное место на главном экране, затем выбрать «Виджеты» → The Word.",
    "customize": "В настройках виджета выберите язык, размер текста и обновление: каждые 15, 30 или 60 минут либо только вручную. Кнопка «Новый стих» позволяет сменить стих в любое время.",
    "timing": "Android может задерживать автоматическое обновление для экономии заряда.",
    "verse": "В начале сотворил Бог небо и землю.",
    "refresh": "Новый стих",
    "settings": "Настройки"
  },
  "ar": {
    "title": "أداة Android",
    "description": "اعرض آية عشوائية على الشاشة الرئيسية لهاتفك، حتى دون اتصال بالإنترنت. اضغط على الآية لفتحها مباشرة في صفحة القراءة.",
    "install": "لإضافتها، اضغط مطولاً على أيقونة The Word، ثم اختر الأدوات وأضف الأداة. بحسب هاتفك، يمكنك أيضاً الضغط مطولاً على مساحة فارغة من الشاشة الرئيسية، ثم اختيار الأدوات ← The Word.",
    "customize": "في إعدادات الأداة، اختر اللغة وحجم النص والتحديث: كل 15 أو 30 أو 60 دقيقة، أو يدوياً فقط. يمكنك تغيير الآية في أي وقت بالضغط على «آية جديدة».",
    "timing": "قد يؤخر Android التحديث التلقائي لتوفير طاقة البطارية.",
    "verse": "فِي الْبَدْءِ خَلَقَ اللهُ السَّمَاوَاتِ وَالأَرْضَ،",
    "refresh": "آية جديدة",
    "settings": "الإعدادات"
  },
  "hi": {
    "title": "Android विजेट",
    "description": "फ़ोन की होम स्क्रीन पर एक यादृच्छिक बाइबिल पद देखें, इंटरनेट के बिना भी। पद को सीधे पठन पृष्ठ में खोलने के लिए उस पर टैप करें।",
    "install": "जोड़ने के लिए The Word के आइकन को दबाकर रखें, फिर विजेट चुनें और विजेट जोड़ें। अपने फ़ोन के अनुसार, आप होम स्क्रीन की खाली जगह को दबाकर भी विजेट → The Word चुन सकते हैं।",
    "customize": "विजेट की सेटिंग में भाषा, अक्षरों का आकार और पद बदलने का अंतराल चुनें: हर 15, 30 या 60 मिनट, या केवल हाथ से। कभी भी पद बदलने के लिए «नया पद» पर टैप करें।",
    "timing": "बैटरी बचाने के लिए Android अपने आप पद बदलने में देरी कर सकता है।",
    "verse": "आदि में परमेश्वर ने आकाश और पृथ्वी की सृष्टि की। (इब्रा. 1:10, इब्रा. 11:3)",
    "refresh": "नया पद",
    "settings": "सेटिंग्स"
  },
  "id": {
    "title": "Widget Android",
    "description": "Tampilkan ayat acak di layar utama ponsel, bahkan saat offline. Ketuk ayat untuk membukanya langsung di halaman Baca.",
    "install": "Untuk menambahkannya, sentuh lama ikon The Word, pilih Widget, lalu tambahkan widget. Bergantung pada ponsel, Anda juga dapat menyentuh lama area kosong di layar utama, lalu memilih Widget → The Word.",
    "customize": "Di pengaturan widget, pilih bahasa, ukuran teks dan pembaruan: setiap 15, 30 atau 60 menit, atau hanya secara manual. Ketuk “Ayat baru” untuk mengganti ayat kapan saja.",
    "timing": "Android dapat menunda pembaruan otomatis untuk menghemat baterai.",
    "verse": "Pada permulaan segala sesuatu, Allah menciptakan tingkat-tingkat surga dan langit serta bumi.",
    "refresh": "Ayat baru",
    "settings": "Pengaturan"
  },
  "ja": {
    "title": "Androidウィジェット",
    "description": "スマートフォンのホーム画面にランダムな聖句を表示できます。オフラインでも利用でき、聖句をタップすると該当箇所の読書ページが直接開きます。",
    "install": "追加するには、The Wordのアイコンを長押しし、「ウィジェット」を選んで追加します。機種によっては、ホーム画面の空いている場所を長押しして「ウィジェット」→「The Word」から追加できます。",
    "customize": "ウィジェットの設定で、言語、文字サイズ、更新間隔（15分・30分・60分ごと、または手動のみ）を選べます。「新しい聖句」をタップすると、いつでも聖句を切り替えられます。",
    "timing": "バッテリーを節約するため、Androidが自動更新を遅らせることがあります。",
    "verse": "はじめに神は天と地とを創造された。",
    "refresh": "新しい聖句",
    "settings": "設定"
  },
  "ko": {
    "title": "Android 위젯",
    "description": "인터넷 연결 없이도 휴대전화 홈 화면에 무작위 성경 구절을 표시합니다. 구절을 누르면 읽기 화면의 해당 구절로 바로 이동합니다.",
    "install": "The Word 아이콘을 길게 누르고 위젯을 선택하여 추가하세요. 기종에 따라 홈 화면의 빈 공간을 길게 누른 다음 위젯 → The Word를 선택할 수도 있습니다.",
    "customize": "위젯 설정에서 언어, 글자 크기, 갱신 간격을 선택하세요. 15분, 30분, 60분마다 자동으로 바꾸거나 수동으로만 바꿀 수 있습니다. «새 구절»을 누르면 언제든 구절을 바꿀 수 있습니다.",
    "timing": "배터리 절약을 위해 Android가 자동 갱신을 지연할 수 있습니다.",
    "verse": "태초에 하나님이 천지를 창조하시니라",
    "refresh": "새 구절",
    "settings": "설정"
  },
  "sw": {
    "title": "Wijeti ya Android",
    "description": "Onyesha aya ya nasibu kwenye skrini ya mwanzo ya simu yako, hata bila intaneti. Gusa aya ili kuifungua moja kwa moja kwenye ukurasa wa Kusoma.",
    "install": "Ili kuiongeza, bonyeza na ushikilie ikoni ya The Word, chagua Wijeti, kisha uiongeze. Kulingana na simu yako, unaweza pia kubonyeza na kushikilia sehemu tupu ya skrini ya mwanzo, kisha uchague Wijeti → The Word.",
    "customize": "Katika mipangilio ya wijeti, chagua lugha, ukubwa wa maandishi na muda wa kubadilisha aya: kila dakika 15, 30 au 60, au wewe mwenyewe pekee. Gusa «Aya mpya» ili kubadilisha aya wakati wowote.",
    "timing": "Android inaweza kuchelewesha mabadiliko ya kiotomatiki ili kuokoa betri.",
    "verse": "Hapo mwanzo Mungu aliumba mbingu na dunia.",
    "refresh": "Aya mpya",
    "settings": "Mipangilio"
  },
  "tr": {
    "title": "Android widget’ı",
    "description": "Telefonunuzun ana ekranında çevrimdışıyken bile rastgele bir ayet görüntüleyin. Ayete dokunarak doğrudan Okuma sayfasında açın.",
    "install": "Eklemek için The Word simgesine basılı tutun, Widget’lar seçeneğini seçip widget’ı ekleyin. Telefonunuza bağlı olarak ana ekranda boş bir alana basılı tutup Widget’lar → The Word yolunu da izleyebilirsiniz.",
    "customize": "Widget ayarlarında dili, yazı boyutunu ve yenilemeyi seçin: 15, 30 veya 60 dakikada bir ya da yalnızca elle. İstediğiniz zaman ayeti değiştirmek için «Yeni ayet»e dokunun.",
    "timing": "Android, pil tasarrufu için otomatik yenilemeyi geciktirebilir.",
    "verse": "Başlangıçta Tanrı gökleri ve yeri yarattı.",
    "refresh": "Yeni ayet",
    "settings": "Ayarlar"
  },
  "yo": {
    "title": "Wíjẹ́ẹ̀tì Android",
    "description": "Fi ẹsẹ Bíbélì àrìnàkò hàn lórí ojú ìbẹ̀rẹ̀ fóònù rẹ, àní láìsí ìkànnì ayélujára. Fọwọ́ kan ẹsẹ náà láti ṣí i tààrà nínú Kíkà.",
    "install": "Láti fi kún un, tẹ àmì The Word mọ́lẹ̀ fún ìgbà díẹ̀, yan Widgets, kí o sì fi wíjẹ́ẹ̀tì náà kún un. Ó tún lè ṣeé ṣe lórí fóònù rẹ láti tẹ àyè òfo lórí ojú ìbẹ̀rẹ̀ mọ́lẹ̀, kí o sì yan Widgets → The Word.",
    "customize": "Nínú ètò wíjẹ́ẹ̀tì, yan èdè, ìwọ̀n lẹ́tà àti bí ẹsẹ yóò ṣe máa yí padà: ní gbogbo ìṣẹ́jú 15, 30 tàbí 60, tàbí nígbà tí o bá fẹ́ nìkan. Fọwọ́ kan «Ẹsẹ tuntun» láti yí ẹsẹ padà nígbàkigbà.",
    "timing": "Android lè fa àkókò ìyípadà aládàáṣiṣẹ́ sẹ́yìn láti fi agbára bátírì pamọ́.",
    "verse": "Ní ìbẹ̀rẹ̀ ohun gbogbo Ọlọ́run dá àwọn ọ̀run àti ayé.",
    "refresh": "Ẹsẹ tuntun",
    "settings": "Ètò"
  },
  "zh": {
    "title": "Android 小组件",
    "description": "在手机主屏幕上显示随机经文，离线也能使用。点击经文即可直接打开对应的阅读页面。",
    "install": "长按 The Word 应用图标，选择“小组件”并添加。根据手机型号，也可以长按主屏幕的空白区域，然后选择“小组件”→“The Word”。",
    "customize": "在小组件设置中选择语言、字号和更新方式：每15、30或60分钟自动更新，或仅手动更新。点击“新经文”可随时切换经文。",
    "timing": "为了节省电量，Android 可能会延迟自动更新。",
    "verse": "太初，上帝创造了天地。",
    "refresh": "新的经文",
    "settings": "设置"
  },
  "he": {
    "title": "וידג׳ט ל-Android",
    "description": "הציגו פסוק אקראי במסך הבית של הטלפון, גם ללא חיבור לאינטרנט. הקישו על הפסוק כדי לפתוח אותו ישירות במסך הקריאה.",
    "install": "כדי להוסיף אותו, לחצו לחיצה ארוכה על סמל The Word, בחרו בווידג׳טים והוסיפו את הווידג׳ט. בהתאם לטלפון, אפשר גם ללחוץ לחיצה ארוכה על אזור ריק במסך הבית, ואז לבחור בווידג׳טים וב-The Word.",
    "customize": "בהגדרות הווידג׳ט בחרו שפה, גודל טקסט ורענון: בכל 15, 30 או 60 דקות, או באופן ידני בלבד. הקישו על «פסוק חדש» כדי להחליף פסוק בכל עת.",
    "timing": "Android עשוי לעכב את הרענון האוטומטי כדי לחסוך בסוללה.",
    "verse": "בְּרֵאשִׁ֖ית בָּרָ֣א אֱלֹהִ֑ים אֵ֥ת הַשָּׁמַ֖יִם וְאֵ֥ת הָאָֽרֶץ׃",
    "refresh": "פסוק חדש",
    "settings": "הגדרות"
  },
  "el": {
    "title": "Γραφικό στοιχείο Android",
    "description": "Εμφανίστε ένα τυχαίο εδάφιο στην αρχική οθόνη του τηλεφώνου σας, ακόμη και χωρίς σύνδεση. Πατήστε το εδάφιο για να το ανοίξετε απευθείας στην Ανάγνωση.",
    "install": "Για να το προσθέσετε, πατήστε παρατεταμένα το εικονίδιο The Word, επιλέξτε Γραφικά στοιχεία και προσθέστε το. Ανάλογα με το τηλέφωνο, μπορείτε επίσης να πατήσετε παρατεταμένα σε κενό χώρο της αρχικής οθόνης και να επιλέξετε Γραφικά στοιχεία → The Word.",
    "customize": "Στις ρυθμίσεις του στοιχείου επιλέξτε γλώσσα, μέγεθος κειμένου και ανανέωση: κάθε 15, 30 ή 60 λεπτά ή μόνο χειροκίνητα. Πατήστε «Νέο εδάφιο» για να αλλάξετε εδάφιο οποιαδήποτε στιγμή.",
    "timing": "Το Android μπορεί να καθυστερήσει την αυτόματη ανανέωση για εξοικονόμηση μπαταρίας.",
    "verse": "ἘΝ ἀρχῇ ἐποίησεν ὁ Θεὸς τὸν οὐρανὸν καὶ τὴν γῆν.",
    "refresh": "Νέο εδάφιο",
    "settings": "Ρυθμίσεις"
  }
};

/* Aide visuelle : mêmes onglets rectangulaires et références que Lecture. */
const QuickSlotsHelpInline: React.FC = () => {
  const { state } = useApp();
  const { t } = useTranslation();
  const examples = [
    { number: 0, book: 'John', chapter: 3, tooltip: 'quickSlotLastPassageTooltip' },
    { number: 1, book: 'Psalms', chapter: 119, tooltip: 'quickSlot1ActiveTooltip' },
    { number: 2, book: 'Daniel', chapter: 8, tooltip: 'quickSlot2Tooltip' },
    { number: 3, book: 'Romans', chapter: 8, tooltip: 'quickSlot3Tooltip' },
  ];

  return (
    <div>
      <div className="grid grid-cols-4 gap-2" role="img" aria-label={t('quickSlotsIllustrationLabel')}>
        {examples.map(example => {
          const book = bibleBooks.find(item => item.name === example.book)!;
          const name = getBookAbbreviation(book, state.settings.language);
          const fullName = state.settings.language === 'fr' ? book.nameFr : book.nameEn;
          return (
            <span
              key={example.number}
              title={`${t(example.tooltip)} : ${fullName} ${example.chapter}`}
              className={`min-w-0 min-h-[52px] px-1 py-1.5 flex flex-col items-center justify-center gap-1 rounded-lg border ${example.number === 1 ? 'bg-blue-600 border-blue-400 text-white' : 'bg-blue-950/50 border-blue-800 text-blue-100'}`}
            >
              {example.number === 0 ? <SearchIcon className="w-4 h-4" aria-hidden="true" /> : <span className="text-sm font-bold leading-none">{example.number}</span>}
              <span className="text-[11px] leading-tight whitespace-nowrap">{name} {example.chapter}</span>
            </span>
          );
        })}
      </div>
      <p className="text-white/90 mt-4" style={{ fontSize: TEXT_PX, lineHeight: 1.7 }}>
        {t('quickSlotsIntro')}
      </p>
    </div>
  );
};

/* =========================================================
   PAGE À PROPOS
========================================================= */

export default function About() {
  const { state } = useApp();
  const { t } = useTranslation();
  const androidLabels = ANDROID_LABELS[state.settings.language] ?? ANDROID_LABELS.en;
  const widgetHelp = WIDGET_HELP[state.settings.language] ?? WIDGET_HELP.en;
  const widgetRtl = state.settings.language === 'ar' || state.settings.language === 'he';
  const widgetReference = getBookAbbreviation(bibleBooks.find(book => book.name === 'Genesis')!, state.settings.language) + ' 1:1';

  const isDark =
    state.settings.theme === 'dark';

  const CARD_CLASS = `
    workspace-card
    rounded-xl
    border
    shadow-sm
    p-5
    sm:p-6

    ${
      isDark
        ? `
          bg-gray-800
          border-gray-700
        `
        : `
          bg-white
          border-gray-200
        `
    }
  `;

  const HEADING_CLASS = `
    mb-4
    font-bold
    flex
    items-center
    gap-3

    ${
      isDark
        ? 'text-white'
        : 'text-gray-900'
    }
  `;

  const ICON_BOX_CLASS = `
    w-10
    h-10
    shrink-0
    rounded-lg
    flex
    items-center
    justify-center
    border

    ${
      isDark
        ? `
          bg-blue-950/40
          border-blue-800/60
          text-blue-300
        `
        : `
          bg-blue-50
          border-blue-200
          text-blue-700
        `
    }
  `;

  const BODY_TEXT_CLASS =
    isDark
      ? 'text-white/90'
      : 'text-gray-700';

  return (
    <div
      className={`
        min-h-[100svh]

        ${
          isDark
            ? 'bg-gray-900'
            : 'bg-gray-50'
        }
      `}
    >
      <div className="page-shell container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">

          {/* ==================================================
              EN-TÊTE
          ================================================== */}

          <header className="about-header mb-6">
            <h1 className="page-title about-brand">The <span>Word</span></h1>
            <div className="about-intro">
              {t('aboutIntro').split(/\n\s*\n/).map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </header>

          <div className="flex flex-col gap-5">

            {/* ==================================================
                RECHERCHE
            ================================================== */}

            <section className={CARD_CLASS}>
              <h2
                className={HEADING_CLASS}
                style={{
                  fontSize: `${H2_PX}px`,
                }}
              >
                <span className={ICON_BOX_CLASS}>
                  <SearchIcon size={21} />
                </span>

                {t('searchTitle')}
              </h2>

              <p
                className={BODY_TEXT_CLASS}
                style={{
                  fontSize: `${TEXT_PX}px`,
                  lineHeight: 1.7,
                }}
              >
                {t('aboutDescription')}
              </p>
            </section>

            {/* ==================================================
                VERSET ALÉATOIRE
            ================================================== */}

            <section className={CARD_CLASS}>
              <h2
                className={HEADING_CLASS}
                style={{
                  fontSize: `${H2_PX}px`,
                }}
              >
                <span className={ICON_BOX_CLASS}>
                  <Shuffle size={21} />
                </span>

                {t('randomFeature')}
              </h2>

              <p
                className={BODY_TEXT_CLASS}
                style={{
                  fontSize: `${TEXT_PX}px`,
                  lineHeight: 1.7,
                }}
              >
                {t('randomFeatureDesc')}
              </p>
            </section>

            {/* ==================================================
                RACCOURCIS DE LECTURE
            ================================================== */}

            <section className={CARD_CLASS}>
              <h2
                className={HEADING_CLASS}
                style={{
                  fontSize: `${H2_PX}px`,
                }}
              >
                <span className={ICON_BOX_CLASS}>
                  <BookOpen size={21} />
                </span>

                {t('readingShortcuts')}
              </h2>

              <QuickSlotsHelpInline />
            </section>

            <section className={CARD_CLASS} aria-labelledby="android-widget-title" data-android-widget dir={widgetRtl ? 'rtl' : 'ltr'}>
              <h2 id="android-widget-title" className={HEADING_CLASS} style={{ fontSize: H2_PX }}>
                <span className={ICON_BOX_CLASS}><Smartphone size={21} aria-hidden="true" /></span>
                {widgetHelp.title}
              </h2>
              <p className={BODY_TEXT_CLASS} style={{ fontSize: TEXT_PX, lineHeight: 1.7 }}>{widgetHelp.description}</p>

              {/* Illustration only: these controls are not interactive in the help page. */}
              <div className="mx-auto my-6 w-full max-w-sm overflow-hidden rounded-2xl border border-blue-300/20 p-4 shadow-lg" style={{ background: 'linear-gradient(135deg, #15243b, #0f172a)', color: '#f4f7fd' }}>
                <div className="flex items-center justify-between gap-3" dir="ltr">
                  <div className="shrink-0">
                    <div style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 23, lineHeight: 1.15, letterSpacing: '-0.8px' }}>
                      The <span style={{ color: '#a9c9ff', fontStyle: 'italic' }}>Word</span>
                    </div>
                    <div className="mx-auto mt-1.5 h-0.5 w-7 rounded-full" style={{ background: '#568ce0' }} />
                  </div>
                  <span className="flex min-w-0 items-center gap-1.5 text-xs" style={{ color: '#a9c9ff' }} dir={widgetRtl ? 'rtl' : 'ltr'}>
                    <Shuffle size={18} className="shrink-0" aria-hidden="true" />
                    <span>{widgetHelp.refresh}</span>
                  </span>
                </div>
                <p className="my-0 flex min-h-[112px] items-center py-5" style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 19, lineHeight: 1.5 }}>
                  {widgetHelp.verse}
                </p>
                <div className="flex items-center justify-between gap-3 text-xs">
                  <span style={{ color: '#9dbff3' }}><bdi>{widgetReference}</bdi></span>
                  <span className="flex items-center gap-1.5" style={{ color: '#c7d8f1' }}><SettingsIcon size={14} aria-hidden="true" />{widgetHelp.settings}</span>
                </div>
              </div>

              <p className={BODY_TEXT_CLASS} style={{ fontSize: TEXT_PX, lineHeight: 1.7 }}>{widgetHelp.install}</p>
              <p className={BODY_TEXT_CLASS + ' mt-4'} style={{ fontSize: TEXT_PX, lineHeight: 1.7 }}>{widgetHelp.customize}</p>
              <p className="mt-3 text-sm leading-relaxed opacity-75">{widgetHelp.timing}</p>
            </section>


            {/* ==================================================
                VERSIONS BIBLIQUES
            ================================================== */}

            <section className={CARD_CLASS}>
              <h2
                className={HEADING_CLASS}
                style={{
                  fontSize: `${H2_PX}px`,
                }}
              >
                <span className={ICON_BOX_CLASS}>
                  <Languages size={21} />
                </span>

                {t('bibleVersions')}
              </h2>

              <p
                className={BODY_TEXT_CLASS}
                style={{
                  fontSize: `${TEXT_PX}px`,
                  lineHeight: 1.7,
                }}
              >
                {t('versionsFootnote')}
              </p>
            </section>

            {/* ==================================================
                CONTACT / CONFIDENTIALITÉ
            ================================================== */}

            <footer
              className={`
                mt-1
                pt-6
                pb-3
                text-center
                border-t

                ${
                  isDark
                    ? 'border-gray-800'
                    : 'border-gray-200'
                }
              `}
            >
              <div
                className={`
                  flex
                  flex-wrap
                  items-center
                  justify-center
                  gap-2

                  ${
                    isDark
                      ? 'text-white/70'
                      : 'text-gray-600'
                  }
                `}
                style={{
                  fontSize: `${TEXT_PX}px`,
                }}
              >
                <Mail size={18} />

                <span>
                  {t('aboutContactLabel')}
                </span>

                <a
                  href="mailto:contact@theword.fr"
                  className={`
                    underline
                    underline-offset-4
                    transition-colors

                    ${
                      isDark
                        ? `
                          text-blue-300
                          hover:text-blue-200
                        `
                        : `
                          text-blue-700
                          hover:text-blue-600
                        `
                    }
                  `}
                >
                  contact@theword.fr
                </a>
              </div>

              <p className="mt-4">
                <a
                  href="https://theword.fr/privacy.html"
                  className={`
                    underline
                    underline-offset-4
                    text-sm
                    transition-colors

                    ${
                      isDark
                        ? `
                          text-white/60
                          hover:text-white/90
                        `
                        : `
                          text-gray-500
                          hover:text-gray-800
                        `
                    }
                  `}
                >
                  {t('aboutPrivacyPolicy')}
                </a>
              </p>
            </footer>

              <section className={CARD_CLASS} aria-labelledby="android-download-title" data-android-download>
                <h2 id="android-download-title" className={HEADING_CLASS} style={{ fontSize: H2_PX }}>
                  {androidLabels[0]}
                </h2>
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <a href={GOOGLE_PLAY_URL} target="_blank" rel="noopener noreferrer" aria-label={androidLabels[1]} className="shrink-0 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400">
                    <img src={GOOGLE_PLAY_QR} width={160} height={160} alt={androidLabels[2]} className="block rounded-xl bg-white" />
                  </a>
                  <div className="flex flex-col items-center sm:items-start gap-4 text-center sm:text-start">
                    <p className={BODY_TEXT_CLASS} style={{ fontSize: TEXT_PX, lineHeight: 1.7 }}>
                      {androidLabels[2]}
                    </p>
                    <a href={GOOGLE_PLAY_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 rounded-xl border border-gray-600 bg-black px-5 py-3 text-white hover:bg-gray-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400">
                      <svg width="26" height="28" viewBox="0 0 24 26" aria-hidden="true" className="shrink-0">
                        <path d="M2 1 14 13 2 25Z" fill="#4285f4" />
                        <path d="M2 1 18 10 14 13Z" fill="#34a853" />
                        <path d="m14 13 4-3 5 3-5 3Z" fill="#fbbc04" />
                        <path d="m2 25 12-12 4 3Z" fill="#ea4335" />
                      </svg>
                      <span>{androidLabels[1]}</span>
                    </a>
                  </div>
                </div>
              </section>
          </div>
        </div>
      </div>
    </div>
  );
}

