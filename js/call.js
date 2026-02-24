const phoneInput = document.getElementById("phone");
const flagSpan = document.querySelector(".phone-flag");
const countryCodes = {
    "994": { trunk: "0", format: "## ### ## ##", length: 9, operators: ["50","51","55","70","77","99"], flag: "🇦🇿" }, // Azerbaijan
    "1":   { trunk: "",  format: "### ### ####", length: 10, operators: [], flag: "🇺🇸" }, // USA/Canada
    "44":  { trunk: "0", format: "#### ### ####", length: 10, operators: ["71","72","73","74","75","76","77","78","79","70","75"], flag: "🇬🇧" }, // UK
    "49":  { trunk: "0", format: "### ########", length: 10, operators: ["15","16","17","18"], flag: "🇩🇪" }, // Germany
    "7":   { trunk: "",  format: "### ### ####", length: 10, operators: ["910","911","912","913","914","915","916","917","918","919"], flag: "🇷🇺" }, // Russia
    "76":  { trunk: "",  format: "### ### ####", length: 10, operators: ["70","71","72","73","74","75","76","77","78","79"], flag: "🇰🇿" }, // Kazakhstan
    "86":  { trunk: "",  format: "### #### ####", length: 11, operators: ["130","131","132","133","134","135","136","137","138","139","150","151","152","153","155","156","157","158","159","170","171","172","173","175","176","177","178","179","180","181","182","183","184","185","186","187","188","189"], flag: "🇨🇳" }, // China
    "90":  { trunk: "0", format: "### ### ## ##", length: 10, operators: ["50","51","53","54","55","56","57","58","59"], flag: "🇹🇷" }, // Turkey
    "91":  { trunk: "0", format: "## ##### ####", length: 10, operators: ["70","71","72","73","74","75","76","77","78","79"], flag: "🇮🇳" }, // India
    "61":  { trunk: "0", format: "# #### ####", length: 9, operators: ["4","5","7","8","9"], flag: "🇦🇺" }, // Australia
    "81":  { trunk: "0", format: "## #### ####", length: 10, operators: ["70","80","90"], flag: "🇯🇵" }, // Japan
    "82":  { trunk: "0", format: "## #### ####", length: 10, operators: ["10","11","16","17","18","19"], flag: "🇰🇷" }, // South Korea
    "33":  { trunk: "0", format: "# ## ## ## ##", length: 9, operators: ["6","7"], flag: "🇫🇷" }, // France
    "39":  { trunk: "",  format: "### ### ####", length: 9, operators: ["3"], flag: "🇮🇹" }, // Italy
    "34":  { trunk: "",  format: "### ### ###", length: 9, operators: ["6","7"], flag: "🇪🇸" }, // Spain
    "52":  { trunk: "",  format: "### ### ####", length: 10, operators: ["1","2","3","4","5","6","7","8","9"], flag: "🇲🇽" }, // Mexico
    "55":  { trunk: "",  format: "(##) #### ####", length: 11, operators: ["11","12","13","14","15","16","17","18","19"], flag: "🇧🇷" }, // Brazil
    "234": { trunk: "0", format: "### ### ####", length: 10, operators: ["70","80","81","90","91","92","93","94","95","96","97","98","99"], flag: "🇳🇬" }, // Nigeria
    "216": { trunk: "0", format: "## ### ###", length: 8, operators: ["20","21","22","23","24","25","26","27","28","29"], flag: "🇹🇳" }, // Tunisia
    "353": { trunk: "0", format: "## ### ####", length: 9, operators: ["83","85","86","87","88","89"], flag: "🇮🇪" }, // Ireland
};
phoneInput.addEventListener("input", function () {
    let raw = this.value.replace(/\D/g, "");
    if (!raw) { 
        this.value = "";
        flagSpan.textContent = "";
        return; 
    }

    let formattedValue = raw;
    let detectedFlag = "";

    for (let code of Object.keys(countryCodes).sort((a,b)=>b.length-a.length)) {
        if (raw.startsWith(code)) {
            let country = countryCodes[code];
            let numberWithoutCode = raw.slice(code.length);

            if (country.trunk && numberWithoutCode.startsWith(country.trunk)) {
                numberWithoutCode = numberWithoutCode.slice(1);
            }

            let validOperator = country.operators.length === 0 || country.operators.includes(numberWithoutCode.slice(0,2));

            if (numberWithoutCode.length === country.length && validOperator) {
                let formatted = "";
                let index = 0;
                for (let char of country.format) {
                    if (index >= numberWithoutCode.length) break;
                    formatted += char === "#" ? numberWithoutCode[index++] : char;
                }
                formattedValue = `+${code} ${formatted}`;
                detectedFlag = country.flag;
            }

            this.value = formattedValue;
            flagSpan.textContent = detectedFlag;
            return;
        }
    }

    for (let code of Object.keys(countryCodes)) {
        let country = countryCodes[code];
        if (country.trunk && raw.startsWith(country.trunk)) {
            let numberWithoutTrunk = raw.slice(1);
            let validOperator = country.operators.length === 0 || country.operators.includes(numberWithoutTrunk.slice(0,2));

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

    this.value = raw;
    flagSpan.textContent = "";
});