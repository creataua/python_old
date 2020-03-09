var translation = {
	source: {
		title: "Age verification",
		text01: "Are you over 18 years old?",
		text02: "Yes"

	},
	en: {
		title: "Age verification",
		text01: "Are you over 18 years old?",
		text02: "Yes"
	},
	de: {
		title: "Altersüberprüfung",
		text01: "Bist du über 18 Jahre alt?",
		text02: "Ja"
	},
	da: {
		title: "Aldersbekræftelse",
		text01: "Er du over 18 år?",
		text02: "Ja"
	},
	es: {
		title: "Verificación de edad",
		text01: "¿Tienes más de 18 años?",
		text02: "Sí"
	},
	fi: {
		title: "Iän todentaminen",
		text01: "Oletko yli 18-vuotias?",
    text02: "Joo"
	},
	fr: {
		title: "Verification de l'AGE",
		text01: "Avez-vous plus de 18 ans?",
    text02: "Oui"
	},
	it: {
		title: "Verifica dell'età",
		text01: "Hai superato i 18 anni?",
    text02: "Sì"
	},
	nl: {
		title: "Leeftijds verificatie",
		text01: "Ben je ouder dan 18 jaar?",
		text02: "Ja"
	},
	no: {
		title: "Aldersbekreftelse",
		text01: "Er du over 18 år?",
		text02: "Ja"
	},
	pt: {
		title: "Verificação de idade",
		text01: "Tem mais de 18 anos?",
		text02: "Sim"
	},
	ru: {
		title: "Проверка возраста",
		text01: "Вам уже исполнилось 18 лет?",
	  text02: "Да"
	},
	sk: {
		title: "Preverjanje starosti",
		text01: "Máte aspoň 18 rokov?",
		text02: "Áno"
	},
	tr: {
		title: "Yaş doğrulama",
		text01: "18 yaşından büyük müsün?",
		text02: "Evet"
	}
};

function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function detect_language() {
	var forceLang = getParameterByName("lang");

	if (forceLang) {
		return forceLang;
	} else {
		var userLang = navigator.languages && navigator.languages[0] || navigator.language || navigator.userLanguage;
		if (userLang == "zh-CN" || userLang == "zh-SG" || userLang == "zh-MY" || userLang == "zh-CHS") {
			userLang = "zh-Hans";
		} else if (userLang == "zh-HK" || userLang == "zh-MO" || userLang == "zh-TW" || userLang == "zh-CHT") {
			userLang = "zh-Hant";
		} else if (userLang.length > 2) {
			userLang = userLang[0] + userLang[1];
		}
		return userLang;
	}
}

var language = 'source';
var browserLang = detect_language();

function replace_text(lang, text) {
	x = document.getElementById(text);
	if (x) {
		x.innerHTML = translation[lang][text];
	} else if ($('[data-placeholder-' + text + ']').length) {
		$('[data-placeholder-' + text + ']').attr('placeholder', translation[lang][text]);
	} /*else {
		console.log("element not Found: " + text);
	}*/
}

function translation_available(objTrls) {
	if (objTrls[browserLang]) {
		if(objTrls === "translation")
			language = browserLang; // for errors in main.js
		return browserLang;
	} else {
		console.log("translation not Found: " + browserLang);
		return "source";
	}
}

function translate() {
	var availableLang = translation_available(translation);

	for (var x in translation["source"]) {
		replace_text(availableLang, x);
	}
}

$(document).ready(function() {
	translate();
});
