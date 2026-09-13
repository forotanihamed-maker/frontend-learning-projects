const popup = document.querySelector("#popup");
setTimeout(() => {
  popup.classList.add("popup");
}, 3000);

function closepopup() {
  popup.classList.remove("popup");
}

popup.addEventListener("click", closepopup);

const burger = document.querySelector("#burger");
function menu() {
  const navItems = document.querySelectorAll(".nav-item");
  for (const navItem of navItems) {
    if (navItem.classList.contains("nav-item-show")) {
      navItem.classList.remove("nav-item-show");
    } else {
      navItem.classList.add("nav-item-show");
    }
  }
}
burger.addEventListener("click", menu);
const commentList = [
  {
    name: "پیمان",
    content:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطر آنچنان که لازم است.",
    image: "peyman.png",
  },
  {
    name: "ملیکا",
    content:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطر آنچنان که لازم است.",
    image: "melika.png",
  },
  {
    name: "محسن",
    content:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطر آنچنان که لازم است.",
    image: "mohsen.png",
  },
  {
    name: "امید",
    content:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطر آنچنان که لازم است.",
    image: "omid.png",
  },
  {
    name: "حمید",
    content:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطر آنچنان که لازم است.",
    image: "hamid.png",
  },
  {
    name: "رویا",
    content:
      "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطر آنچنان که لازم است.",
    image: "roya.png",
  },
];
const result = commentList
  .map(function (comment) {
    return `<figure class="comment-item">
            <img
              src="./images/${comment.image}"
              class="comment-item-image"
              alt=${comment.name}
            />
            <figcaption class="comment-item-text">
              <h3>${comment.name}</h3>
              <p>
               ${comment.content}
              </p>
            </figcaption>
          </figure>`;
  })
  .join("");

const commmentsItemDiv = document.querySelector("#comment-items");
commmentsItemDiv.innerHTML = result;
const comments = document.querySelectorAll(".comment-item");
const observer = new IntersectionObserver(
  function (items) {
    for (item of items) {
      if (item.isIntersecting) {
        item.target.classList.add("comment-item-animation");
      } else {
        item.target.classList.remove("comment-item-animation");
      }
    }
  },
  {
    threshold: 1.1,
  }
);
for (comment of comments) {
  observer.observe(comment);
}
