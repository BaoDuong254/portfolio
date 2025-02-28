window.onload = function () {
	const message = sessionStorage.getItem("message");
	if (message) {
		alert(message);
		sessionStorage.removeItem("message"); // Xóa sau khi hiển thị
	}
};
// smooth scroll
$(document).ready(function () {
	$(".navbar .nav-link").on("click", function (event) {
		if (this.hash !== "") {
			event.preventDefault();

			var hash = this.hash;

			$("html, body").animate(
				{
					scrollTop: $(hash).offset().top,
				},
				700,
				function () {
					window.location.hash = hash;
				}
			);
		}
	});
});

// navbar toggle
$("#nav-toggle").click(function () {
	$(this).toggleClass("is-active");
	$("ul.nav").toggleClass("show");
});
const API_BASE_URL = window.location.hostname.includes("localhost")
	? "http://localhost:3000"
	: "https://portfoliobao.vercel.app";
function isValidEmail(email) {
	const emailPattern =
		/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
	return emailPattern.test(email);
}

document
	.querySelector(".contact-form")
	.addEventListener("submit", async function (e) {
		e.preventDefault();
		let emailValue = document.getElementById("emailValue").value.trim();
		if (!isValidEmail(emailValue)) {
			alert("Invalid email, please try again!");
			return;
		}
		document.getElementById("loading").style.display = "flex";
		document.body.style.overflow = "hidden"; // khóa cuộn trang
		const formData = new FormData(this);
		const data = Object.fromEntries(formData.entries());

		const response = await fetch(`${API_BASE_URL}/send-email`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});

		const result = await response.json();
		document.getElementById("loading").style.display = "none";
		document.body.style.overflow = "auto"; // mở cuộn trang
		sessionStorage.setItem("message", result.message);
		location.reload();
	});
