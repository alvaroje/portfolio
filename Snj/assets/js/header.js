// Mostrar menu móvil
function mostrarOcultarMenu() {
    var nav = document.getElementById('nav');
    if (nav.className === '') {
        nav.className = 'responsive';
    } else {
        nav.className = '';
    }
}

// Mostrar el header html
document.addEventListener("DOMContentLoaded", () => {
    fetch("header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("header").innerHTML = data;
        })
    
    // Crear un estilo CSS e insertarlo en <head>
    const style = document.createElement("style");
    style.textContent = `
        header {
        /* background-image: url(/Snj/assets/img/snj_header_black_texture.jpg); */
        /* background: url(/Snj/assets/img/snj_header_brick-wall-texture.jpg) no-repeat center center; */
        background: url(assets/img/snj_header_piedra.jpg) no-repeat center center;
        /* background-color: #17181a; */
        /* background-color: #080b08; */
        /* background-color: #68d791; */
        background-size: cover;
        color: white;
        padding: 10px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    header img {
        height: 60px;
        margin-left: 10px;
        border-radius: 30px;
    }

    header h1 {
        position: absolute;
        left: 50%;
        top: 3.2%;
        transform: translateX(-50%);
        margin: 0;
        font-size: 24px;
        text-shadow: #000000 1px 0 10px;
    }

    header h1:hover {
        color: #68d791;
        transition: .3s;
    }

    header a {
        text-decoration: none;
        color: white;
    }

    nav {
        margin-right: 10px;
        z-index: 99;
    }

    nav ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
    }

    nav ul li {
        margin: 0 15px;
    }

    nav ul li a {
        text-decoration: none;
        color: white;
        font-weight: bold;
        transition: color 0.3s;
        text-shadow: #000000 1px 0 10px;
    }

    nav ul li a:hover {
        color: #68d791;
    }

    .nav-responsive {
        z-index: 99;
    }

    .nav-responsive {
        display: none;
    }

    .nav-responsive i {
        cursor: pointer;
        font-size: 30px;
    }

    .nav-responsive i:hover{
        color: #68d791;
    }

    @media screen and (max-width: 980px) {
        nav {
            display: none;
        }
        .nav-responsive {
            display: block;
            z-index: 99;
        }
        nav.responsive {
            display: block;
            position: absolute;
            z-index: 99;
            right: 0;
            top: 75px;
            background-color: #252A2E;
            width: 180px;
        }
        nav.responsive ul {
            display: block !important;
        }
        nav.responsive ul li {
            border-bottom: 1px solid #fff;
            padding: 10px 0;
        }
    }

    @media screen and (max-width: 1520px) {
        .infoImg {
            display: none;
        }

        .content {
            margin-right: 10%;
        }
    }
    `;
    document.head.appendChild(style);
});