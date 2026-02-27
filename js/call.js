const phoneInput = document.getElementById("phone");
const flagSpan = document.querySelector(".phone-flag");
const countryCodes = {
    "994": { trunk: "0", format: "## ### ## ##", length: 9, operators: ["50", "51", "55", "70", "77", "99"], flag: "🇦🇿" }, // Azerbaijan
    "1": {
        trunk: "",
        format: "### ### ####",
        length: 10,
        operators: {
            "us": [
                "201", "202", "203", "205", "206", "207", "208", "209", "210", "212", "213", "214", "215", "216", "217", "218", "219", "220", "224", "225", "228", "229", "231", "234", "239", "240", "248", "251", "252", "253", "254", "256", "260", "262", "267", "269", "270", "272", "276", "281", "283", "301", "302", "303", "304", "305", "307", "308", "309", "310", "312", "313", "314", "315", "316", "317", "318", "319", "320", "321", "323", "325", "326", "327", "330", "331", "332", "334", "336", "337", "339", "340", "341", "346", "347", "351", "352", "360", "361", "364", "380", "385", "386", "401", "402", "404", "405", "406", "407", "408", "409", "410", "412", "413", "414", "415", "416", "417", "418", "419", "423", "424", "425", "430", "432", "434", "435", "440", "441", "442", "443", "445", "447", "448", "458", "463", "469", "470", "472", "475", "478", "479", "480", "484", "501", "502", "503", "504", "505", "507", "508", "509", "510", "512", "513", "515", "516", "517", "518", "520", "530", "531", "534", "539", "540", "541", "551", "559", "561", "562", "563", "564", "567", "570", "571", "573", "574", "575", "580", "585", "586", "601", "602", "603", "605", "606", "607", "608", "609", "610", "612", "613", "614", "615", "616", "617", "618", "619", "620", "623", "626", "627", "628", "629", "630", "631", "636", "640", "641", "646", "650", "651", "656", "657", "659", "660", "661", "662", "667", "669", "678", "679", "680", "681", "682", "701", "702", "703", "704", "706", "707", "708", "712", "713", "714", "715", "716", "717", "718", "719", "720", "724", "725", "726", "727", "730", "731", "732", "734", "737", "740", "743", "747", "754", "757", "760", "762", "763", "765", "769", "770", "772", "773", "774", "775", "779", "781", "785", "786", "787", "801", "802", "803", "804", "805", "806", "808", "810", "812", "813", "814", "815", "816", "817", "818", "820", "828", "830", "831", "832", "838", "839", "840", "843", "845", "847", "848", "850", "854", "856", "857", "858", "859", "860", "862", "863", "864", "865", "870", "872", "878", "901", "903", "904", "906", "907", "908", "909", "910", "912", "913", "914", "915", "916", "917", "918", "919", "920", "925", "928", "929", "930", "931", "934", "936", "937", "938", "940", "941", "943", "945", "947", "948", "949", "951", "952", "954", "956", "959", "970", "971", "972", "973", "974", "975", "978", "979", "980", "984", "985", "986", "989"
            ],
            "ca": [
                "204", "226", "236", "249", "250", "263", "289", "306", "343", "354", "365", "367", "368", "382", "387", "403", "416", "418", "428", "431", "437", "438", "450", "468", "474", "506", "514", "519", "548", "579", "581", "584", "587", "604", "613", "639", "647", "672", "683", "705", "709", "742", "753", "778", "780", "782", "807", "819", "825", "867", "873", "879", "902", "905", "942"
            ]
        },
        flags: {
            "us": "🇺🇸",
            "ca": "🇨🇦"
        }
    }, // USA/Canada
    "44": { trunk: "0", format: "#### ### ####", length: 10, operators: ["71", "72", "73", "74", "75", "76", "77", "78", "79", "70", "75"], flag: "🇬🇧" }, // UK
    "49": { trunk: "0", format: "### ########", length: 10, operators: ["15", "16", "17", "18"], flag: "🇩🇪" }, // Germany
    "7": { trunk: "", format: "### ### ####", length: 10, operators: ["910", "911", "912", "913", "914", "915", "916", "917", "918", "919"], flag: "🇷🇺" }, // Russia
    "76": { trunk: "", format: "### ### ####", length: 10, operators: ["70", "71", "72", "73", "74", "75", "76", "77", "78", "79"], flag: "🇰🇿" }, // Kazakhstan
    "86": { trunk: "", format: "### #### ####", length: 11, operators: ["130", "131", "132", "133", "134", "135", "136", "137", "138", "139", "150", "151", "152", "153", "155", "156", "157", "158", "159", "170", "171", "172", "173", "175", "176", "177", "178", "179", "180", "181", "182", "183", "184", "185", "186", "187", "188", "189"], flag: "🇨🇳" }, // China
    "90": { trunk: "0", format: "### ### ## ##", length: 10, operators: ["50", "51", "53", "54", "55", "56", "57", "58", "59"], flag: "🇹🇷" }, // Turkey
    "91": { trunk: "0", format: "## ##### ####", length: 10, operators: ["70", "71", "72", "73", "74", "75", "76", "77", "78", "79"], flag: "🇮🇳" }, // India
    "61": { trunk: "0", format: "# #### ####", length: 9, operators: ["4", "5", "7", "8", "9"], flag: "🇦🇺" }, // Australia
    "81": { trunk: "0", format: "## #### ####", length: 10, operators: ["70", "80", "90"], flag: "🇯🇵" }, // Japan
    "82": { trunk: "0", format: "## #### ####", length: 10, operators: ["10", "11", "16", "17", "18", "19"], flag: "🇰🇷" }, // South Korea
    "33": { trunk: "0", format: "# ## ## ## ##", length: 9, operators: ["6", "7"], flag: "🇫🇷" }, // France
    "39": { trunk: "", format: "### ### ####", length: 9, operators: ["3"], flag: "🇮🇹" }, // Italy
    "34": { trunk: "", format: "### ### ###", length: 9, operators: ["6", "7"], flag: "🇪🇸" }, // Spain
    "52": { trunk: "", format: "### ### ####", length: 10, operators: ["1", "2", "3", "4", "5", "6", "7", "8", "9"], flag: "🇲🇽" }, // Mexico
    "55": { trunk: "", format: "(##) #### ####", length: 11, operators: ["11", "12", "13", "14", "15", "16", "17", "18", "19"], flag: "🇧🇷" }, // Brazil
    "234": { trunk: "0", format: "### ### ####", length: 10, operators: ["70", "80", "81", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99"], flag: "🇳🇬" }, // Nigeria
    "216": { trunk: "0", format: "## ### ###", length: 8, operators: ["20", "21", "22", "23", "24", "25", "26", "27", "28", "29"], flag: "🇹🇳" }, // Tunisia
    "353": { trunk: "0", format: "## ### ####", length: 9, operators: ["83", "85", "86", "87", "88", "89"], flag: "🇮🇪" }, // Ireland
};

phoneInput.addEventListener("input", function () {
    let raw = this.value.replace(/\D/g, "");
    if (!raw) {
        this.value = "";
        flagSpan.textContent = "";
        return;
    }

    if (raw.startsWith("994") && raw.length === 11) {
        let numberWithoutCode = raw.slice(3);
        this.value = "0" + numberWithoutCode;
        flagSpan.textContent = "🇦🇿";
        return;
    }

    if (raw.startsWith("90") && raw.length === 11) {
        let numberWithoutCode = raw.slice(2);
        if (numberWithoutCode.startsWith("55")) {
            let azerbaijanNumber = "994" + numberWithoutCode;
            let azerbaijanNumberWithoutCode = azerbaijanNumber.slice(3);

            let country = countryCodes["994"];
            let formatted = "";
            let index = 0;
            for (let char of country.format) {
                if (index >= azerbaijanNumberWithoutCode.length) break;
                formatted += char === "#" ? azerbaijanNumberWithoutCode[index++] : char;
            }
            this.value = `+994 ${formatted}`;
            flagSpan.textContent = "🇦🇿";
            return;
        }
    }

    if (raw.startsWith("994") && raw.length === 13) {
        let numberWithoutCode = raw.slice(3);
        if (numberWithoutCode.startsWith("55") && numberWithoutCode.length === 10) {
            let turkeyNumber = "90" + numberWithoutCode;
            let turkeyNumberWithoutCode = turkeyNumber.slice(2);

            let country = countryCodes["90"];
            let formatted = "";
            let index = 0;
            for (let char of country.format) {
                if (index >= turkeyNumberWithoutCode.length) break;
                formatted += char === "#" ? turkeyNumberWithoutCode[index++] : char;
            }
            this.value = `+90 ${formatted}`;
            flagSpan.textContent = "🇹🇷";
            return;
        }
    }

    let formattedValue = raw;
    let detectedFlag = "";

    for (let code of Object.keys(countryCodes).sort((a, b) => b.length - a.length)) {
        if (raw.startsWith(code)) {
            let country = countryCodes[code];

            if (code === "1") {
                let numberWithoutCode = raw.slice(code.length);

                for (let op of country.operators.us) {
                    if (numberWithoutCode.startsWith(op)) {
                        if (numberWithoutCode.length === country.length) {
                            let formatted = "";
                            let index = 0;
                            for (let char of country.format) {
                                if (index >= numberWithoutCode.length) break;
                                formatted += char === "#" ? numberWithoutCode[index++] : char;
                            }
                            formattedValue = `+${code} ${formatted}`;
                            detectedFlag = country.flags.us;
                        } else {
                            formattedValue = `+${code} ${numberWithoutCode}`;
                            detectedFlag = country.flags.us;
                        }
                        this.value = formattedValue;
                        flagSpan.textContent = detectedFlag;
                        return;
                    }
                }

                for (let op of country.operators.ca) {
                    if (numberWithoutCode.startsWith(op)) {
                        if (numberWithoutCode.length === country.length) {
                            let formatted = "";
                            let index = 0;
                            for (let char of country.format) {
                                if (index >= numberWithoutCode.length) break;
                                formatted += char === "#" ? numberWithoutCode[index++] : char;
                            }
                            formattedValue = `+${code} ${formatted}`;
                            detectedFlag = country.flags.ca;
                        } else {
                            formattedValue = `+${code} ${numberWithoutCode}`;
                            detectedFlag = country.flags.ca;
                        }
                        this.value = formattedValue;
                        flagSpan.textContent = detectedFlag;
                        return;
                    }
                }
            } else {
                let numberWithoutCode = raw.slice(code.length);

                if (country.trunk && numberWithoutCode.startsWith(country.trunk)) {
                    numberWithoutCode = numberWithoutCode.slice(1);
                }

                let validOperator = country.operators.length === 0 || country.operators.includes(numberWithoutCode.slice(0, 2));

                if (numberWithoutCode.length === country.length && validOperator) {
                    let formatted = "";
                    let index = 0;
                    for (let char of country.format) {
                        if (index >= numberWithoutCode.length) break;
                        formatted += char === "#" ? numberWithoutCode[index++] : char;
                    }
                    formattedValue = `+${code} ${formatted}`;
                    detectedFlag = country.flag;
                } else if (validOperator) {
                    formattedValue = `+${code} ${numberWithoutCode}`;
                    detectedFlag = country.flag;
                }

                this.value = formattedValue;
                flagSpan.textContent = detectedFlag;
                return;
            }
        }
    }

    for (let code of Object.keys(countryCodes)) {
        let country = countryCodes[code];
        if (code === "1") continue;

        if (country.trunk && raw.startsWith(country.trunk)) {
            let numberWithoutTrunk = raw.slice(1);
            let validOperator = country.operators.length === 0 || country.operators.includes(numberWithoutTrunk.slice(0, 2));

            if (numberWithoutTrunk.length === country.length && validOperator) {
                let formatted = "";
                let index = 0;
                for (let char of country.format) {
                    if (index >= numberWithoutTrunk.length) break;
                    formatted += char === "#" ? numberWithoutTrunk[index++] : char;
                }
                formattedValue = `+${code} ${formatted}`;
                detectedFlag = country.flag;
                this.value = formattedValue;
                flagSpan.textContent = detectedFlag;
                return;
            }
        }
    }
if (raw.startsWith("0")) {
    for (let code of Object.keys(countryCodes)) {
        let country = countryCodes[code];
        if (!country.trunk) continue; 

        let numberWithoutTrunk = raw.slice(1);
        let operator = numberWithoutTrunk.slice(0, country.operators[0]?.length || 2);  
        let validOperator = country.operators.length === 0 || country.operators.includes(operator);

        if (validOperator && numberWithoutTrunk.length === country.length) {
            let formatted = "";
            let index = 0;
            for (let char of country.format) {
                if (index >= numberWithoutTrunk.length) break;
                formatted += char === "#" ? numberWithoutTrunk[index++] : char;
            }
            this.value = `+${code} ${formatted}`;
            flagSpan.textContent = country.flag;
            return;
        }
    }
}

    this.value = raw;
    flagSpan.textContent = "";
});