/**
 * Drawings of the v3 landing, as inline SVG strings (presentation attributes only: the CSP forbids style="").
 * Brand marks: simple-icons 16.35.0 (CC0) for Claude, Cursor, OpenCode, YouTube, TikTok, Instagram, Facebook, Apple
 * and Linux; Lobe Icons 1.97.0 (MIT) for Codex, Antigravity and Grok. The person, the controller and the waveforms
 * are drawn for this page. Every mark is decorative (aria-hidden): the text next to it names it.
 */

/** simple-icons path data, one 24x24 path per brand. */
const SIMPLE = {
	claude:
		"m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z",
	cursor:
		"M11.503.131 1.891 5.678a.84.84 0 0 0-.42.726v11.188c0 .3.162.575.42.724l9.609 5.55a1 1 0 0 0 .998 0l9.61-5.55a.84.84 0 0 0 .42-.724V6.404a.84.84 0 0 0-.42-.726L12.497.131a1.01 1.01 0 0 0-.996 0M2.657 6.338h18.55c.263 0 .43.287.297.515L12.23 22.918c-.062.107-.229.064-.229-.06V12.335a.59.59 0 0 0-.295-.51l-9.11-5.257c-.109-.063-.064-.23.061-.23",
	opencode: "M22 24H2V0h20zM17 4.8H7v14.4h10z",
	youtube:
		"M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
	tiktok:
		"M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
	instagram:
		"M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077",
	facebook:
		"M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z",
	apple:
		"M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701",
	linux:
		"M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139zm.529 3.405h.013c.213 0 .396.062.584.198.19.135.33.332.438.533.105.259.158.459.166.724 0-.02.006-.04.006-.06v.105a.086.086 0 01-.004-.021l-.004-.024a1.807 1.807 0 01-.15.706.953.953 0 01-.213.335.71.71 0 00-.088-.042c-.104-.045-.198-.064-.284-.133a1.312 1.312 0 00-.22-.066c.05-.06.146-.133.183-.198.053-.128.082-.264.088-.402v-.02a1.21 1.21 0 00-.061-.4c-.045-.134-.101-.2-.183-.333-.084-.066-.167-.132-.267-.132h-.016c-.093 0-.176.03-.262.132a.8.8 0 00-.205.334 1.18 1.18 0 00-.09.4v.019c.002.089.008.179.02.267-.193-.067-.438-.135-.607-.202a1.635 1.635 0 01-.018-.2v-.02a1.772 1.772 0 01.15-.768c.082-.22.232-.406.43-.533a.985.985 0 01.594-.2zm-2.962.059h.036c.142 0 .27.048.399.135.146.129.264.288.344.465.09.199.14.4.153.667v.004c.007.134.006.2-.002.266v.08c-.03.007-.056.018-.083.024-.152.055-.274.135-.393.2.012-.09.013-.18.003-.267v-.015c-.012-.133-.04-.2-.082-.333a.613.613 0 00-.166-.267.248.248 0 00-.183-.064h-.021c-.071.006-.13.04-.186.132a.552.552 0 00-.12.27.944.944 0 00-.023.33v.015c.012.135.037.2.08.334.046.134.098.2.166.268.01.009.02.018.034.024-.07.057-.117.07-.176.136a.304.304 0 01-.131.068 2.62 2.62 0 01-.275-.402 1.772 1.772 0 01-.155-.667 1.759 1.759 0 01.08-.668 1.43 1.43 0 01.283-.535c.128-.133.26-.2.418-.2zm1.37 1.706c.332 0 .733.065 1.216.399.293.2.523.269 1.052.468h.003c.255.136.405.266.478.399v-.131a.571.571 0 01.016.47c-.123.31-.516.643-1.063.842v.002c-.268.135-.501.333-.775.465-.276.135-.588.292-1.012.267a1.139 1.139 0 01-.448-.067 3.566 3.566 0 01-.322-.198c-.195-.135-.363-.332-.612-.465v-.005h-.005c-.4-.246-.616-.512-.686-.71-.07-.268-.005-.47.193-.6.224-.135.38-.271.483-.336.104-.074.143-.102.176-.131h.002v-.003c.169-.202.436-.47.839-.601.139-.036.294-.065.466-.065zm2.8 2.142c.358 1.417 1.196 3.475 1.735 4.473.286.534.855 1.659 1.102 3.024.156-.005.33.018.513.064.646-1.671-.546-3.467-1.089-3.966-.22-.2-.232-.335-.123-.335.59.534 1.365 1.572 1.646 2.757.13.535.16 1.104.021 1.67.067.028.135.06.205.067 1.032.534 1.413.938 1.23 1.537v-.043c-.06-.003-.12 0-.18 0h-.016c.151-.467-.182-.825-1.065-1.224-.915-.4-1.646-.336-1.77.465-.008.043-.013.066-.018.135-.068.023-.139.053-.209.064-.43.268-.662.669-.793 1.187-.13.533-.17 1.156-.205 1.869v.003c-.02.334-.17.838-.319 1.35-1.5 1.072-3.58 1.538-5.348.334a2.645 2.645 0 00-.402-.533 1.45 1.45 0 00-.275-.333c.182 0 .338-.03.465-.067a.615.615 0 00.314-.334c.108-.267 0-.697-.345-1.163-.345-.467-.931-.995-1.788-1.521-.63-.4-.986-.87-1.15-1.396-.165-.534-.143-1.085-.015-1.645.245-1.07.873-2.11 1.274-2.763.107-.065.037.135-.408.974-.396.751-1.14 2.497-.122 3.854a8.123 8.123 0 01.647-2.876c.564-1.278 1.743-3.504 1.836-5.268.048.036.217.135.289.202.218.133.38.333.59.465.21.201.477.335.876.335.039.003.075.006.11.006.412 0 .73-.134.997-.268.29-.134.52-.334.74-.4h.005c.467-.135.835-.402 1.044-.7zm2.185 8.958c.037.6.343 1.245.882 1.377.588.134 1.434-.333 1.791-.765l.211-.01c.315-.007.577.01.847.268l.003.003c.208.199.305.53.391.876.085.4.154.78.409 1.066.486.527.645.906.636 1.14l.003-.007v.018l-.003-.012c-.015.262-.185.396-.498.595-.63.401-1.746.712-2.457 1.57-.618.737-1.37 1.14-2.036 1.191-.664.053-1.237-.2-1.574-.898l-.005-.003c-.21-.4-.12-1.025.056-1.69.176-.668.428-1.344.463-1.897.037-.714.076-1.335.195-1.814.12-.465.308-.797.641-.984l.045-.022zm-10.814.049h.01c.053 0 .105.005.157.014.376.055.706.333 1.023.752l.91 1.664.003.003c.243.533.754 1.064 1.189 1.637.434.598.77 1.131.729 1.57v.006c-.057.744-.48 1.148-1.125 1.294-.645.135-1.52.002-2.395-.464-.968-.536-2.118-.469-2.857-.602-.369-.066-.61-.2-.723-.4-.11-.2-.113-.602.123-1.23v-.004l.002-.003c.117-.334.03-.752-.027-1.118-.055-.401-.083-.71.043-.94.16-.334.396-.4.69-.533.294-.135.64-.202.915-.47h.002v-.002c.256-.268.445-.601.668-.838.19-.201.38-.336.663-.336zm7.159-9.074c-.435.201-.945.535-1.488.535-.542 0-.97-.267-1.28-.466-.154-.134-.28-.268-.373-.335-.164-.134-.144-.333-.074-.333.109.016.129.134.199.2.096.066.215.2.36.333.292.2.68.467 1.167.467.485 0 1.053-.267 1.398-.466.195-.135.445-.334.648-.467.156-.136.149-.267.279-.267.128.016.034.134-.147.332a8.097 8.097 0 01-.69.468zm-1.082-1.583V5.64c-.006-.02.013-.042.029-.05.074-.043.18-.027.26.004.063 0 .16.067.15.135-.006.049-.085.066-.135.066-.055 0-.092-.043-.141-.068-.052-.018-.146-.008-.163-.065zm-.551 0c-.02.058-.113.049-.166.066-.047.025-.086.068-.14.068-.05 0-.13-.02-.136-.068-.01-.066.088-.133.15-.133.08-.031.184-.047.259-.005.019.009.036.03.03.05v.02h.003z",
};

/** The brand colour of a simple-icons mark on the dark page; null takes the text colour. */
const SIMPLE_FILL = {
	claude: "#D97757",
	youtube: "#FF0033",
	facebook: "#0866FF",
};

let uidCount = 0;
/** Lobe Icons marks carry gradient and mask ids: each copy on the page gets its own suffix. */
const LOBE = {
	codex: (uid) =>
		`<path d="M19.503 0H4.496A4.496 4.496 0 000 4.496v15.007A4.496 4.496 0 004.496 24h15.007A4.496 4.496 0 0024 19.503V4.496A4.496 4.496 0 0019.503 0z" fill="#fff"></path><path d="M9.064 3.344a4.578 4.578 0 012.285-.312c1 .115 1.891.54 2.673 1.275.01.01.024.017.037.021a.09.09 0 00.043 0 4.55 4.55 0 013.046.275l.047.022.116.057a4.581 4.581 0 012.188 2.399c.209.51.313 1.041.315 1.595a4.24 4.24 0 01-.134 1.223.123.123 0 00.03.115c.594.607.988 1.33 1.183 2.17.289 1.425-.007 2.71-.887 3.854l-.136.166a4.548 4.548 0 01-2.201 1.388.123.123 0 00-.081.076c-.191.551-.383 1.023-.74 1.494-.9 1.187-2.222 1.846-3.711 1.838-1.187-.006-2.239-.44-3.157-1.302a.107.107 0 00-.105-.024c-.388.125-.78.143-1.204.138a4.441 4.441 0 01-1.945-.466 4.544 4.544 0 01-1.61-1.335c-.152-.202-.303-.392-.414-.617a5.81 5.81 0 01-.37-.961 4.582 4.582 0 01-.014-2.298.124.124 0 00.006-.056.085.085 0 00-.027-.048 4.467 4.467 0 01-1.034-1.651 3.896 3.896 0 01-.251-1.192 5.189 5.189 0 01.141-1.6c.337-1.112.982-1.985 1.933-2.618.212-.141.413-.251.601-.33.215-.089.43-.164.646-.227a.098.098 0 00.065-.066 4.51 4.51 0 01.829-1.615 4.535 4.535 0 011.837-1.388zm3.482 10.565a.637.637 0 000 1.272h3.636a.637.637 0 100-1.272h-3.636zM8.462 9.23a.637.637 0 00-1.106.631l1.272 2.224-1.266 2.136a.636.636 0 101.095.649l1.454-2.455a.636.636 0 00.005-.64L8.462 9.23z" fill="url(#lobe-icons-codex-${uid})"></path><defs><linearGradient gradientUnits="userSpaceOnUse" id="lobe-icons-codex-${uid}" x1="12" x2="12" y1="3" y2="21"><stop stop-color="#B1A7FF"></stop><stop offset=".5" stop-color="#7A9DFF"></stop><stop offset="1" stop-color="#3941FF"></stop></linearGradient></defs>`,
	antigravity: (uid) =>
		`<mask height="23" id="lobe-icons-antigravity-0-${uid}" maskUnits="userSpaceOnUse" width="24" x="0" y="1"><path d="M21.751 22.607c1.34 1.005 3.35.335 1.508-1.508C17.73 15.74 18.904 1 12.037 1 5.17 1 6.342 15.74.815 21.1c-2.01 2.009.167 2.511 1.507 1.506 5.192-3.517 4.857-9.714 9.715-9.714 4.857 0 4.522 6.197 9.714 9.715z" fill="#fff"></path></mask><g mask="url(#lobe-icons-antigravity-0-${uid})"><g filter="url(#lobe-icons-antigravity-1-${uid})"><path d="M-1.018-3.992c-.408 3.591 2.686 6.89 6.91 7.37 4.225.48 7.98-2.043 8.387-5.633.408-3.59-2.686-6.89-6.91-7.37-4.225-.479-7.98 2.043-8.387 5.633z" fill="#FFE432"></path></g><g filter="url(#lobe-icons-antigravity-2-${uid})"><path d="M15.269 7.747c1.058 4.557 5.691 7.374 10.348 6.293 4.657-1.082 7.575-5.653 6.516-10.21-1.058-4.556-5.691-7.374-10.348-6.292-4.657 1.082-7.575 5.653-6.516 10.21z" fill="#FC413D"></path></g><g filter="url(#lobe-icons-antigravity-3-${uid})"><path d="M-12.443 10.804c1.338 4.703 7.36 7.11 13.453 5.378 6.092-1.733 9.947-6.95 8.61-11.652C8.282-.173 2.26-2.58-3.833-.848-9.925.884-13.78 6.1-12.443 10.804z" fill="#00B95C"></path></g><g filter="url(#lobe-icons-antigravity-4-${uid})"><path d="M-12.443 10.804c1.338 4.703 7.36 7.11 13.453 5.378 6.092-1.733 9.947-6.95 8.61-11.652C8.282-.173 2.26-2.58-3.833-.848-9.925.884-13.78 6.1-12.443 10.804z" fill="#00B95C"></path></g><g filter="url(#lobe-icons-antigravity-5-${uid})"><path d="M-7.608 14.703c3.352 3.424 9.126 3.208 12.896-.483 3.77-3.69 4.108-9.459.756-12.883C2.69-2.087-3.083-1.871-6.853 1.82c-3.77 3.69-4.108 9.458-.755 12.883z" fill="#00B95C"></path></g><g filter="url(#lobe-icons-antigravity-6-${uid})"><path d="M9.932 27.617c1.04 4.482 5.384 7.303 9.7 6.3 4.316-1.002 6.971-5.448 5.93-9.93-1.04-4.483-5.384-7.304-9.7-6.301-4.316 1.002-6.971 5.448-5.93 9.93z" fill="#3186FF"></path></g><g filter="url(#lobe-icons-antigravity-7-${uid})"><path d="M2.572-8.185C.392-3.329 2.778 2.472 7.9 4.771c5.122 2.3 11.042.227 13.222-4.63 2.18-4.855-.205-10.656-5.327-12.955-5.122-2.3-11.042-.227-13.222 4.63z" fill="#FBBC04"></path></g><g filter="url(#lobe-icons-antigravity-8-${uid})"><path d="M-3.267 38.686c-5.277-2.072 3.742-19.117 5.984-24.83 2.243-5.712 8.34-8.664 13.616-6.592 5.278 2.071 11.533 13.482 9.29 19.195-2.242 5.713-23.613 14.298-28.89 12.227z" fill="#3186FF"></path></g><g filter="url(#lobe-icons-antigravity-9-${uid})"><path d="M28.71 17.471c-1.413 1.649-5.1.808-8.236-1.878-3.135-2.687-4.531-6.201-3.118-7.85 1.412-1.649 5.1-.808 8.235 1.878s4.532 6.2 3.119 7.85z" fill="#749BFF"></path></g><g filter="url(#lobe-icons-antigravity-10-${uid})"><path d="M18.163 9.077c5.81 3.93 12.502 4.19 14.946.577 2.443-3.612-.287-9.727-6.098-13.658-5.81-3.931-12.502-4.19-14.946-.577-2.443 3.612.287 9.727 6.098 13.658z" fill="#FC413D"></path></g><g filter="url(#lobe-icons-antigravity-11-${uid})"><path d="M-.915 2.684c-1.44 3.473-.97 6.967 1.05 7.804 2.02.837 4.824-1.3 6.264-4.772 1.44-3.473.97-6.967-1.05-7.804-2.02-.837-4.824 1.3-6.264 4.772z" fill="#FFEE48"></path></g></g><defs><filter color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse" height="17.587" id="lobe-icons-antigravity-1-${uid}" width="19.838" x="-3.288" y="-11.917"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend><feGaussianBlur result="effect1_foregroundBlur_977_115" stdDeviation="1.117"></feGaussianBlur></filter><filter color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse" height="38.565" id="lobe-icons-antigravity-2-${uid}" width="38.9" x="4.251" y="-13.493"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend><feGaussianBlur result="effect1_foregroundBlur_977_115" stdDeviation="5.4"></feGaussianBlur></filter><filter color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse" height="36.517" id="lobe-icons-antigravity-3-${uid}" width="40.955" x="-21.889" y="-10.592"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend><feGaussianBlur result="effect1_foregroundBlur_977_115" stdDeviation="4.591"></feGaussianBlur></filter><filter color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse" height="36.517" id="lobe-icons-antigravity-4-${uid}" width="40.955" x="-21.889" y="-10.592"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend><feGaussianBlur result="effect1_foregroundBlur_977_115" stdDeviation="4.591"></feGaussianBlur></filter><filter color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse" height="36.595" id="lobe-icons-antigravity-5-${uid}" width="36.632" x="-19.099" y="-10.278"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend><feGaussianBlur result="effect1_foregroundBlur_977_115" stdDeviation="4.591"></feGaussianBlur></filter><filter color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse" height="34.087" id="lobe-icons-antigravity-6-${uid}" width="33.533" x=".981" y="8.758"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend><feGaussianBlur result="effect1_foregroundBlur_977_115" stdDeviation="4.363"></feGaussianBlur></filter><filter color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse" height="35.276" id="lobe-icons-antigravity-7-${uid}" width="35.978" x="-6.143" y="-21.659"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend><feGaussianBlur result="effect1_foregroundBlur_977_115" stdDeviation="3.954"></feGaussianBlur></filter><filter color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse" height="46.523" id="lobe-icons-antigravity-8-${uid}" width="45.114" x="-11.96" y="-.46"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend><feGaussianBlur result="effect1_foregroundBlur_977_115" stdDeviation="3.531"></feGaussianBlur></filter><filter color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse" height="24.054" id="lobe-icons-antigravity-9-${uid}" width="25.094" x="10.485" y=".58"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend><feGaussianBlur result="effect1_foregroundBlur_977_115" stdDeviation="3.159"></feGaussianBlur></filter><filter color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse" height="30.007" id="lobe-icons-antigravity-10-${uid}" width="33.508" x="5.833" y="-12.467"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend><feGaussianBlur result="effect1_foregroundBlur_977_115" stdDeviation="2.669"></feGaussianBlur></filter><filter color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse" height="26.151" id="lobe-icons-antigravity-11-${uid}" width="22.194" x="-8.355" y="-8.876"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend><feGaussianBlur result="effect1_foregroundBlur_977_115" stdDeviation="3.303"></feGaussianBlur></filter></defs>`,
	grok: () =>
		`<path d="M9.27 15.29l7.978-5.897c.391-.29.95-.177 1.137.272.98 2.369.542 5.215-1.41 7.169-1.951 1.954-4.667 2.382-7.149 1.406l-2.711 1.257c3.889 2.661 8.611 2.003 11.562-.953 2.341-2.344 3.066-5.539 2.388-8.42l.006.007c-.983-4.232.242-5.924 2.75-9.383.06-.082.12-.164.179-.248l-3.301 3.305v-.01L9.267 15.292M7.623 16.723c-2.792-2.67-2.31-6.801.071-9.184 1.761-1.763 4.647-2.483 7.166-1.425l2.705-1.25a7.808 7.808 0 00-1.829-1A8.975 8.975 0 005.984 5.83c-2.533 2.536-3.33 6.436-1.962 9.764 1.022 2.487-.653 4.246-2.34 6.022-.599.63-1.199 1.259-1.682 1.925l7.62-6.815"></path>`,
};

/** A brand mark at `size` px. Simple-icons marks without a brand colour use currentColor. */
export function brandMark(name, size = 18) {
	if (SIMPLE[name]) {
		const fill = SIMPLE_FILL[name] ?? "currentColor";
		return `<svg class="brand-mark" aria-hidden="true" viewBox="0 0 24 24" width="${size}" height="${size}"><path fill="${fill}" d="${SIMPLE[name]}"/></svg>`;
	}
	if (LOBE[name]) {
		uidCount += 1;
		const fill =
			name === "grok" ? ' fill="currentColor" fill-rule="evenodd"' : "";
		return `<svg class="brand-mark" aria-hidden="true" viewBox="0 0 24 24" width="${size}" height="${size}"${fill}>${LOBE[name](`lp-${name}-${uidCount}`)}</svg>`;
	}
	throw new Error(`no brand mark ${name}`);
}

/** The palettes of the drawn person: the same figure in three looks. */
const PEOPLE = {
	a: {
		skin: "#e2ac87",
		shade: "#c78e6b",
		hair: "#2a201d",
		top: "#3c4f63",
		bg: "#2c3a48",
	},
	b: {
		skin: "#c68a62",
		shade: "#a9714e",
		hair: "#3f281d",
		top: "#6b7b3a",
		bg: "#3a2f52",
	},
	c: {
		skin: "#f0c3a0",
		shade: "#d4a382",
		hair: "#8b9097",
		top: "#5a5f66",
		bg: "#26402f",
	},
};

/** A drawn head-and-shoulders figure (a webcam or a speaker), filling its box from the bottom. */
export function person(variant = "a", bg) {
	const c = PEOPLE[variant];
	const p = [
		`<rect width="100" height="100" fill="${bg ?? c.bg}"/>`,
		'<circle cx="78" cy="22" r="26" fill="#ffffff" opacity=".06"/>',
	];
	if (variant === "b")
		p.push(
			`<path d="M33 46C30 22 42 18 50.5 18C60 18 71 23 68 46C70 56 72 63 66 69L60 67C63 56 63 48 63 41C59 33 55 31.5 50 31.5C44 31.5 39.5 34 37 41C37 49 37 56 40 67L34 69C28 63 31 56 33 46Z" fill="${c.hair}"/>`,
		);
	p.push(
		`<path d="M10 100C12 80 28 71 50 71C72 71 88 80 90 100Z" fill="${c.top}"/>`,
		`<path d="M43 55h14v17q-7 5-14 0Z" fill="${c.shade}"/>`,
		`<path d="M42 71L50 81L58 71Z" fill="${c.shade}"/>`,
		`<ellipse cx="35.6" cy="45" rx="2.8" ry="4" fill="${c.shade}"/><ellipse cx="64.4" cy="45" rx="2.8" ry="4" fill="${c.shade}"/>`,
		`<ellipse cx="50" cy="43" rx="14.5" ry="17.5" fill="${c.skin}"/>`,
	);
	if (variant === "a")
		p.push(
			`<path d="M35.5 41C34 27 41 22.5 50.5 22.5C60 22.5 66.5 27.5 64.5 41C62 34.5 57 31.5 50 31.5C43.5 31.5 38 34.5 35.5 41Z" fill="${c.hair}"/>`,
			`<path d="M37 47C38 58 44 61.5 50 61.5C56 61.5 62 58 63 47C61 54 56 56.5 50 56.5C44 56.5 39 54 37 47Z" fill="${c.hair}" opacity=".85"/>`,
		);
	else if (variant === "b")
		p.push(
			`<path d="M35.5 42C34 28 42 23 50.5 23C59 23 66.5 28 64.5 42C60 33 52 30 45 33C40 35 37 38 35.5 42Z" fill="${c.hair}"/>`,
		);
	else
		p.push(
			`<path d="M36 38C36 28 43 24.5 50.5 24.5C58 24.5 64.5 28 64 38C61 33 56 31.8 50 31.8C44 31.8 39 33 36 38Z" fill="${c.hair}"/>`,
		);
	p.push(
		'<circle cx="44.5" cy="44.5" r="1.6" fill="#1f1a18"/><circle cx="55.5" cy="44.5" r="1.6" fill="#1f1a18"/>',
		`<path d="M41.5 40.3q3-1.6 6 0M52.5 40.3q3-1.6 6 0" stroke="${c.hair}" stroke-width="1.3" fill="none" stroke-linecap="round"/>`,
		'<path d="M45.5 52.3Q50 55.8 54.5 52.3" stroke="#7a3b2e" stroke-width="1.5" fill="none" stroke-linecap="round"/>',
	);
	if (variant === "a")
		p.push(
			'<path d="M64.5 47C66 55 62 58.5 56 58.8" stroke="#15171a" stroke-width="1.6" fill="none" stroke-linecap="round"/><circle cx="55.5" cy="58.8" r="1.9" fill="#15171a"/>',
		);
	if (variant === "c")
		p.push(
			'<rect x="40" y="41.3" width="9" height="6.4" rx="2" stroke="#1f1a18" stroke-width="1.2" fill="none"/><rect x="51" y="41.3" width="9" height="6.4" rx="2" stroke="#1f1a18" stroke-width="1.2" fill="none"/><path d="M49 44h2" stroke="#1f1a18" stroke-width="1.2"/>',
		);
	return `<svg class="ppl" aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="xMidYMax slice">${p.join("")}</svg>`;
}

/** The controller overlay, drawn as a DualSense: triggers with a pressure gauge, touchpad, light bar, PS button. */
export function dualsense() {
	return [
		'<rect x="44" y="6" width="44" height="14" rx="7" fill="#d8dbd2" stroke="#b9bdb3"/>',
		'<rect x="152" y="6" width="44" height="14" rx="7" fill="#d8dbd2" stroke="#b9bdb3"/>',
		'<rect class="ds-gauge" x="154" y="8" width="40" height="10" rx="5" fill="#a2d305"/>',
		'<rect x="50" y="18" width="36" height="7" rx="3.5" fill="#c9ccc3"/><rect x="154" y="18" width="36" height="7" rx="3.5" fill="#c9ccc3"/>',
		'<path d="M60 24C80 17 160 17 180 24C204 32 218 60 228 98C236 128 220 144 202 140C188 137 178 120 166 106L74 106C62 120 52 137 38 140C20 144 4 128 12 98C22 60 36 32 60 24Z" fill="#eef0ea" stroke="#c9ccc3" stroke-width="1.5"/>',
		'<path d="M84 28L156 28C166 44 168 76 162 100L78 100C72 76 74 44 84 28Z" fill="#16181b"/>',
		'<rect x="94" y="31" width="52" height="31" rx="5" fill="#24272b" stroke="#3a3e44"/>',
		'<path class="ds-lightbar" d="M92 64Q96 72 104 74M148 64Q144 72 136 74" stroke="#4da3ff" stroke-width="2.4" fill="none" stroke-linecap="round"/>',
		'<rect x="84" y="33" width="4" height="10" rx="2" fill="#3a3e44"/><rect x="152" y="33" width="4" height="10" rx="2" fill="#3a3e44"/>',
		'<circle cx="120" cy="86" r="4.6" fill="#2e3237"/><rect x="116" y="94" width="8" height="2.6" rx="1.3" fill="#ff8a5c"/>',
		'<g fill="#d8dbd2" stroke="#b9bdb3"><rect x="55" y="50" width="10" height="10" rx="2.5"/><rect x="55" y="68" width="10" height="10" rx="2.5"/><rect x="46" y="59" width="10" height="10" rx="2.5"/><rect x="64" y="59" width="10" height="10" rx="2.5"/></g>',
		'<circle class="ds-btn ds-btn--4" cx="180" cy="51" r="7.5" fill="#d8dbd2" stroke="#b9bdb3"/><circle class="ds-btn ds-btn--2" cx="193" cy="64" r="7.5" fill="#d8dbd2" stroke="#b9bdb3"/><circle class="ds-btn ds-btn--1" cx="180" cy="77" r="7.5" fill="#d8dbd2" stroke="#b9bdb3"/><circle class="ds-btn ds-btn--3" cx="167" cy="64" r="7.5" fill="#d8dbd2" stroke="#b9bdb3"/>',
		'<g stroke="#5f645a" stroke-width="1.6" fill="none" stroke-linejoin="round"><path d="M180 47.4L183.7 53.8L176.3 53.8Z"/><circle cx="193" cy="64" r="3.4"/><path d="M177 74L183 80M183 74L177 80"/><rect x="164" y="61" width="6" height="6"/></g>',
		'<circle cx="96" cy="92" r="12.5" fill="#1b1d20" stroke="#2c3035"/><circle class="ds-stick" cx="96" cy="92" r="7.8" fill="#34383e"/>',
		'<circle cx="144" cy="92" r="12.5" fill="#1b1d20" stroke="#2c3035"/><circle class="ds-stick ds-stick--2" cx="144" cy="92" r="7.8" fill="#34383e"/>',
	].join("");
}

/** A deterministic waveform: `bars` rounded bars in a 100 x `height` box, quieter every ninth bar. */
export function waveform(seed, bars = 64, height = 28) {
	const width = 100 / bars;
	const out = [];
	for (let index = 0; index < bars; index++) {
		const value =
			Math.abs(((index * 7919 + seed * 104729) % 997) / 997 - 0.5) * 2;
		let amp = 3 + value * (height / 2 - 3);
		if (index % 9 < 2) amp *= 0.35;
		out.push(
			`<rect x="${(index * width + width * 0.2).toFixed(2)}" y="${(height / 2 - amp).toFixed(2)}" width="${(width * 0.6).toFixed(2)}" height="${(amp * 2).toFixed(2)}" rx=".4"/>`,
		);
	}
	return `<svg class="wave-svg" aria-hidden="true" viewBox="0 0 100 ${height}" preserveAspectRatio="none">${out.join("")}</svg>`;
}

let sceneCount = 0;

/**
 * A drawn gameplay scene for the games stage while no cleared footage is shown: a skatepark at dusk with a quarter
 * pipe and a rail, the skater in the air. The parts that move carry gs-* classes; the CSS animates them only while
 * the demo is live. 640 x 360, sliced to cover its box.
 */
export function gameScene() {
	sceneCount += 1;
	const id = (name) => `lp-gs-${name}-${sceneCount}`;
	const stars = [
		[42, 34, 1.4],
		[118, 62, 1],
		[204, 28, 1.2],
		[268, 74, 0.9],
		[332, 40, 1.3],
		[566, 46, 1.1],
		[602, 88, 0.9],
		[22, 96, 0.8],
	]
		.map(
			([cx, cy, r]) =>
				`<circle cx="${cx}" cy="${cy}" r="${r}" fill="#ffffff" opacity=".7"/>`,
		)
		.join("");
	return `<svg class="game-scene" aria-hidden="true" viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="${id("sky")}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1b1442"/><stop offset=".55" stop-color="#6b2f6e"/><stop offset=".85" stop-color="#d9623f"/><stop offset="1" stop-color="#f59e5b"/></linearGradient><radialGradient id="${id("sun")}" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(470 208) scale(150)"><stop offset="0" stop-color="#ffd59a" stop-opacity=".95"/><stop offset=".25" stop-color="#ffb070" stop-opacity=".55"/><stop offset="1" stop-color="#ff8a5c" stop-opacity="0"/></radialGradient><linearGradient id="${id("ramp")}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a3d6b"/><stop offset="1" stop-color="#231b38"/></linearGradient><linearGradient id="${id("ground")}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2e2547"/><stop offset="1" stop-color="#120e1f"/></linearGradient></defs>
<rect width="640" height="360" fill="url(#${id("sky")})"/>${stars}
<circle cx="470" cy="208" r="150" fill="url(#${id("sun")})"/><circle cx="470" cy="208" r="38" fill="#ffd59a"/>
<g class="gs-clouds" fill="#ffffff" opacity=".12"><ellipse cx="140" cy="118" rx="70" ry="9"/><ellipse cx="400" cy="96" rx="90" ry="8"/><ellipse cx="590" cy="134" rx="60" ry="7"/></g>
<path d="M0 238h26v-34h22v20h18v-46h26v60h14v-28h30v36h20v-62h24v52h16v-22h28v34h22v-48h30v58h18v-30h26v40h20v-54h26v48h18v-26h28v32h24v-42h28v40h20v-24h30v36h22v-50h26v46H640v24H0Z" fill="#2a1d4a" opacity=".85"/>
<path d="M0 262h640v98H0Z" fill="url(#${id("ground")})"/>
<path d="M0 158h118c0 70 36 104 112 104H0Z" fill="url(#${id("ramp")})"/><path d="M0 158h118" stroke="#e9e4f5" stroke-width="4" stroke-linecap="round"/><path d="M118 158c0 70 36 104 112 104" fill="none" stroke="#7d6ba8" stroke-width="2" opacity=".6"/>
<path d="M378 292 548 252" stroke="#eceaf4" stroke-width="5" stroke-linecap="round"/><path d="M396 288v24M470 271v30M530 257v34" stroke="#9c93b8" stroke-width="4" stroke-linecap="round"/>
<path d="M0 262h640" stroke="#4d4170" stroke-width="2"/>
<g class="gs-skater"><path class="gs-trail" d="M250 216c40-42 82-58 118-54M262 232c36-34 74-48 104-44" fill="none" stroke="#ffd59a" stroke-width="3" stroke-linecap="round" opacity=".5"/><g transform="translate(398 150) rotate(-12)"><rect x="-34" y="44" width="68" height="8" rx="4" fill="#120e1f" stroke="#ff9e6b" stroke-width="1.5"/><circle cx="-22" cy="56" r="4" fill="#ff9e6b"/><circle cx="22" cy="56" r="4" fill="#ff9e6b"/><path d="M-14 44 -6 22 4 30 14 44" fill="none" stroke="#120e1f" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/><path d="M-4 22 2 -6" stroke="#120e1f" stroke-width="12" stroke-linecap="round"/><path d="M2 -2 -26 -18M2 -2 30 6" stroke="#120e1f" stroke-width="6" stroke-linecap="round"/><circle cx="4" cy="-20" r="9" fill="#120e1f"/><path d="M-6 22 2 -6M2 -2 30 6" fill="none" stroke="#ff9e6b" stroke-width="1.2" opacity=".8"/></g></g>
</svg>`;
}
