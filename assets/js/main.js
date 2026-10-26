/* ============================================================
   ADVERUNE — main.js
   Navigation, reveals, accordion, inquiry flow, dialog.
   No external libraries. Respects prefers-reduced-motion.
   ============================================================ */
(function () {
  "use strict";

  var CFG = window.ADVERUNE_CONFIG || { contact: {}, social: {}, siteUrl: "" };
  var REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Footer year ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------- Header shadow on scroll ---------- */
  var header = document.querySelector(".site-header");
  var onScrollHeader = function () {
    header.classList.toggle("scrolled", window.scrollY > 8);
  };
  window.addEventListener("scroll", onScrollHeader, { passive: true });
  onScrollHeader();

  /* ---------- Mobile menu ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("mobileMenu");

  function setMenu(open) {
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
    menu.classList.toggle("open", open);
  }
  toggle.addEventListener("click", function () {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });
  menu.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () { setMenu(false); });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setMenu(false);
  });

  /* ---------- Smooth anchor scrolling (with sticky-header offset) ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href");
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var y = target.getBoundingClientRect().top + window.scrollY - 84;
      window.scrollTo({ top: y, behavior: REDUCED ? "auto" : "smooth" });
      history.replaceState(null, "", id);
    });
  });

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !REDUCED) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("visible");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---------- Active nav link while scrolling ---------- */
  var navLinks = document.querySelectorAll(".nav-links a, .mobile-menu a");
  var sections = ["top", "services", "work", "process", "about", "contact"]
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  var setActive = function () {
    var pos = window.scrollY + 120;
    var current = sections[0];
    sections.forEach(function (s) { if (s.offsetTop <= pos) current = s; });
    navLinks.forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("href") === "#" + current.id);
    });
  };
  window.addEventListener("scroll", setActive, { passive: true });
  setActive();

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".faq-q").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var open = btn.getAttribute("aria-expanded") === "true";
      var panel = document.getElementById(btn.getAttribute("aria-controls"));
      document.querySelectorAll(".faq-q[aria-expanded='true']").forEach(function (other) {
        if (other !== btn) {
          other.setAttribute("aria-expanded", "false");
          document.getElementById(other.getAttribute("aria-controls")).style.maxHeight = "0px";
        }
      });
      btn.setAttribute("aria-expanded", open ? "false" : "true");
      panel.style.maxHeight = open ? "0px" : panel.scrollHeight + "px";
    });
  });

  /* ---------- Inquiry flow: prefill + scroll to form ---------- */
  var serviceSelect = document.getElementById("f-service");
  var nameInput = document.getElementById("f-name");

  function openInquiry(service, sourceEl) {
    if (service) {
      var match = Array.prototype.find.call(serviceSelect.options, function (o) {
        return o.text === service;
      });
      serviceSelect.value = match ? match.text : "Not sure yet — need advice";
    }
    var y = document.getElementById("contact").getBoundingClientRect().top + window.scrollY - 84;
    window.scrollTo({ top: y, behavior: REDUCED ? "auto" : "smooth" });
    setTimeout(function () { nameInput.focus({ preventScroll: true }); }, REDUCED ? 0 : 500);
    if (sourceEl && sourceEl.getAttribute("href")) {
      /* was an <a>; prevent default handled by caller where needed */
    }
  }

  document.querySelectorAll(".js-inquire").forEach(function (el) {
    el.addEventListener("click", function (e) {
      if (el.tagName === "A") e.preventDefault();
      if (el.id === "dlgInquire") { workDialog.close(); }
      openInquiry(el.getAttribute("data-service"), el);
    });
  });

  /* ---------- Portfolio dialog ---------- */
  var workDialog = document.getElementById("workDialog");
  var WORKS = {
    fashion: {
      title: "E-Commerce Fashion Campaign",
      img: "assets/img/portfolio-fashion.png",
      alt: "Flat illustration of an e-commerce fashion campaign concept",
      desc: "A social media advertising concept for a fashion e-commerce brand: seasonal offer storytelling, coordinated ad creatives, and a clear call-to-action structure planned across Facebook and Instagram placements. Concept project created to demonstrate our campaign planning approach."
    },
    food: {
      title: "Food Delivery Launch",
      img: "assets/img/portfolio-food.png",
      alt: "Flat illustration of a food delivery campaign concept",
      desc: "A launch campaign concept for a local food delivery service: audience mapping by area, appetite-driven creative direction, and promotion sequencing from awareness to first order. Concept project showing how we structure a local-service launch."
    },
    skincare: {
      title: "Skincare Brand Content",
      img: "assets/img/portfolio-skincare.png",
      alt: "Minimal illustration of a skincare brand content concept",
      desc: "A social media content design concept for a skincare brand: a calm, trustworthy visual language, educational content pillars, and product highlight formats. Speculative campaign showing our content strategy direction."
    },
    fitness: {
      title: "Fitness App Promotion",
      img: "assets/img/portfolio-fitness.png",
      alt: "Flat illustration of a fitness app campaign concept",
      desc: "A paid social campaign concept for a fitness app: benefit-first messaging, audience segmentation by motivation, and creative variants planned for testing. Concept project illustrating our ad testing structure."
    },
    realestate: {
      title: "Real Estate Brand Voice",
      img: "assets/img/portfolio-realestate.png",
      alt: "Minimal illustration of a real estate brand communication concept",
      desc: "A brand communication concept for a real estate business: trustworthy messaging pillars, consistent tone across listings and ads, and a visual system for property promotions. Concept project demonstrating brand strategy work."
    },
    education: {
      title: "Online Education Reach",
      img: "assets/img/portfolio-education.png",
      alt: "Flat illustration of an online education campaign concept",
      desc: "A campaign strategy presentation concept for an online education brand: enrollment funnel thinking, audience research direction, and channel planning across search and social. Concept project showing our strategic planning format."
    }
  };

  document.querySelectorAll(".work-card").forEach(function (card) {
    card.addEventListener("click", function () {
      var w = WORKS[card.getAttribute("data-work")];
      if (!w) return;
      document.getElementById("dlgTitle").textContent = w.title;
      var img = document.getElementById("dlgImg");
      img.src = w.img;
      img.alt = w.alt;
      document.getElementById("dlgDesc").textContent = w.desc;
      var inq = document.getElementById("dlgInquire");
      inq.setAttribute("data-service", "Not sure yet — need advice");
      if (typeof workDialog.showModal === "function") {
        workDialog.showModal();
      } else {
        workDialog.setAttribute("open", "");
      }
    });
  });
  document.getElementById("dlgClose").addEventListener("click", function () { workDialog.close(); });
  workDialog.addEventListener("click", function (e) {
    if (e.target === workDialog) workDialog.close();
  });

  /* ---------- Inquiry form: validation + contact action ---------- */
  var form = document.getElementById("inquiryForm");
  var okBox = document.getElementById("formOk");
  var badBox = document.getElementById("formBad");

  function setInvalid(id, bad) {
    document.getElementById(id).closest(".field").classList.toggle("error", bad);
  }
  function val(id) { return document.getElementById(id).value.trim(); }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    okBox.className = "form-status";
    badBox.className = "form-status";

    var name = val("f-name"), business = val("f-business"),
        email = val("f-email"), service = val("f-service"), details = val("f-details");
    var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    setInvalid("f-name", !name);
    setInvalid("f-business", !business);
    setInvalid("f-email", !emailOk);
    setInvalid("f-service", !service);
    setInvalid("f-details", !details);

    if (!name || !business || !emailOk || !service || !details) {
      badBox.className = "form-status bad";
      badBox.textContent = "Please check the highlighted fields and try again.";
      var firstBad = form.querySelector(".field.error input, .field.error select, .field.error textarea");
      if (firstBad) firstBad.focus();
      return;
    }

    /* Build the message the visitor will send themselves */
    var budget = val("f-budget");
    var pref = form.querySelector("input[name='pref']:checked").value;
    var lines = [
      "Hello ADVERUNE! I'd like to discuss a project.",
      "",
      "Name: " + name,
      "Business: " + business,
      "Email: " + email,
      "Service: " + service
    ];
    if (val("f-whatsapp")) lines.push("WhatsApp: " + val("f-whatsapp"));
    if (budget) lines.push("Est. monthly ad budget: " + budget);
    lines.push("", "Project details:", details, "", "Preferred contact: " + pref);

    var message = lines.join("\n");
    var waNum = (CFG.contact.whatsappNumber || "").replace(/[^\d]/g, "");
    var mailAddr = CFG.contact.email || "";
    var waReady = waNum.length >= 8;
    var mailReady = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mailAddr);

    var html = "<strong>Almost done — your inquiry is prepared.</strong> Choose how you'd like to send it:";
    html += '<div class="actions">';
    html += '<a class="btn btn-primary" id="goWa" ' + (waReady ? 'href="https://wa.me/' + waNum + '?text=' + encodeURIComponent(message) + '" target="_blank" rel="noopener"' : 'aria-disabled="true"') + '>Continue on WhatsApp</a>';
    html += '<a class="btn btn-outline" id="goMail" ' + (mailReady ? 'href="mailto:' + mailAddr + '?subject=' + encodeURIComponent("Project Inquiry — " + service) + '&body=' + encodeURIComponent(message) + '"' : 'aria-disabled="true"') + '>Continue via Email</a>';
    html += "</div>";

    if (!waReady && !mailReady) {
      html += "<small>No WhatsApp number or e-mail address has been configured yet, so the buttons above are inactive. The agency can enable them in seconds via <code>assets/js/config.js</code> — see the README.</small>";
    } else {
      if (!waReady) html += "<small>WhatsApp isn't configured yet — only e-mail is available.</small>";
      if (!mailReady) html += "<small>E-mail isn't configured yet — only WhatsApp is available.</small>";
      html += "<small>Your message opens in your chosen app, ready to send from your own account.</small>";
    }

    okBox.className = "form-status ok";
    okBox.innerHTML = html;
    if (!waReady) { document.getElementById("goWa").style.pointerEvents = "none"; document.getElementById("goWa").style.opacity = ".5"; }
    if (!mailReady) { document.getElementById("goMail").style.pointerEvents = "none"; document.getElementById("goMail").style.opacity = ".5"; }
    okBox.scrollIntoView({ behavior: REDUCED ? "auto" : "smooth", block: "center" });
  });

  /* Clear error state as the visitor types */
  ["f-name", "f-business", "f-email", "f-service", "f-details"].forEach(function (id) {
    document.getElementById(id).addEventListener("input", function () {
      setInvalid(id, false);
    });
    document.getElementById(id).addEventListener("change", function () {
      setInvalid(id, false);
    });
  });

  /* ---------- Social links from configuration ---------- */
  var row = document.getElementById("socialRow");
  var anySocial = false;
  ["facebook", "instagram", "linkedin", "twitter"].forEach(function (key) {
    var url = (CFG.social && CFG.social[key]) || "";
    var a = document.getElementById("soc-" + key);
    if (url) {
      a.href = url;
      a.hidden = false;
      a.target = "_blank";
      a.rel = "noopener";
      anySocial = true;
    }
  });
  if (anySocial) {
    row.hidden = false;
    document.getElementById("socialEmpty").style.display = "none";
  }
})();
