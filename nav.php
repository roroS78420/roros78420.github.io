<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
    <link href="css/style6.css" rel="stylesheet" />
    <link rel="icon" type="image/x-icon" href="assets/img/favicon.ico" />


</head>
    

 <!-- Preconnect & DNS Prefetch -->
  <link rel="preconnect" href="https://cdn.jsdelivr.net">
  <link rel="preconnect" href="https://cdnjs.cloudflare.com">
  <link rel="dns-prefetch" href="https://cdn.jsdelivr.net">
  <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com">

        <script src="js/scripts.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js" ></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.0/jquery-ui.min.js" ></script>


<body>
<header id="main-header">
  <div class="container">
    <div class="autohiro-left">
      <h1 class="text-white">Adrien Doll</h1>
    </div>
    <nav class="autohiro-right" id="navbar">
      <ul>
        <li><a href="#accueil">Accueil</a></li>
        <li><a href="#connexion">Connexion</a></li>
        <li><a href="#galerie">Galerie</a></li>
        <li><a href="#contact">Contacter</a></li>
      </ul>
    </nav>
  </div>
</header>
        <canvas id="myCanvas"></canvas>
    <script src="js/canvas.js"></script>
<script>
document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector("header");
  const sections = document.querySelectorAll("section.slide");

  const observer = new IntersectionObserver(
    (entries) => {
      let isFirstVisible = false;

      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target.id === "accueil") {
          isFirstVisible = true;
        }
      });

      if (isFirstVisible) {
        header.classList.remove("affix");
      } else {
        header.classList.add("affix");
      }
    },
    {
      threshold: 0.5,
    }
  );

  sections.forEach((section) => observer.observe(section));
});

  document.addEventListener("DOMContentLoaded", function () {
    const header = document.getElementById("main-header");

    window.addEventListener("scroll", function () {
      if (window.scrollY > 50) {
        header.classList.add("affix");
      } else {
        header.classList.remove("affix");
      }
    });
  });
</script>

  </script>

<?= $content; ?>

<footer class="py-5 bg-dark text-light">
  <div class="container">
    <div class="row">
      <div class="col-md-3 col-lg-4 col-xl-3">
        <h5>Description</h5>
        <hr class="bg-white mb-2 mt-0 d-inline-block mx-auto w-25">
        <p class="mb-0">. . .</p>
      </div>

      <div class="col-md-2 col-lg-2 col-xl-2 mx-auto">
        <h5>S'inscrire</h5>
        <hr class="bg-white mb-2 mt-0 d-inline-block mx-auto w-25">
        <ul class="list-unstyled">
          <li>Inscrivez-vous pour profiter de nos produits</li>
        </ul>
      </div>

      <div class="col-md-4 col-lg-3 col-xl-3">
        <h5>Contact</h5>
        <hr class="bg-white mb-2 mt-0 d-inline-block mx-auto w-25">
        <ul class="list-unstyled">
          <li><i class="fa fa-home mr-2"></i> AutoHiro</li>
          <li><i class="fa fa-envelope mr-2"></i> AutoHiro@gmail.com</li>
          <li><i class="fa fa-phone mr-2"></i> +33 74 66 14 95</li>
          <li><i class="fa fa-print mr-2"></i> +33 24 56 02 34</li>
        </ul>
      </div>

      <div class="col-12 copyright mt-3 text-center">
        <p>Copyright &copy; AUTOHIRO 2021 — <a href="#slide1">Back to top</a></p>
      </div>
    </div>
  </div>
</footer>


</body>
</html>