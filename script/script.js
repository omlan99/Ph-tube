// getTimeString function
function getTimeString(time) {
  const getHour = parseInt(time / 3600);
  let getSeconds = time % 3600;
  const getMinute = parseInt(getSeconds / 60);
  getSeconds = getSeconds % 60;
  return `${getHour} hr ${getMinute} min ${getSeconds} sec`;
}
// creating loadCatrgory function
const loadCategory = () => {
  // fetching data from api
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    // converting the promise to json promise
    .then((res) => res.json())
    // converting the json promise passing the data to displayCategory function
    .then((data) => displayCategory(data.categories))
    .catch((error) => console.log(error));
};
// creating a function to remove active class
const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn");
  for (let button of buttons) {
    button.classList.remove("active");
  }
};
// created a function to get videos for categorywise
const loadCategoryVideo = (id) => {
  // alert(id);
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();

      const activeBtn = document.getElementById(`btn-${id}`);
      activeBtn.classList.add("active");
      displayVideo(data.category);
    })
    .catch((error) => console.log(error));
};
loadCategory();
// creating a diplayCategories function which takes a parameter category
const displayCategory = (category) => {
  const btnContainer = document.getElementById("btnContainer");
  // creating a forEach loop to get category one by one
  category.forEach((item) => {
    // creating a div in variable buttonContainer
    const buttonContainer = document.createElement("div");
    // adding class to button classList.add add single class name and classList add multiple class name
    // adding innerhtml to buttonContainer
    buttonContainer.innerHTML = `
    <button id="btn-${item.category_id}" onclick="loadCategoryVideo(${item.category_id})" class = "btn category-btn">${item.category}</button>
    `;

    // adding the innertext of button to be
    // button.innerText = item.category;
    btnContainer.append(buttonContainer);
  });
};
const loadVideo = (searchText = "") => {
  // fetching video from api
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?tittle=${searchText}`)
    // converting the promise to json promise
    .then((res) => res.json())
    // converting the json promise passing the data to displayVideo function
    .then((data) => displayVideo(data.videos))
    .catch((error) => console.log(error));
};
const loadDetails = async (videoId) => {
  console.log(videoId);
  const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
  const res = await fetch(uri)
  const data = await res.json()
  
  displayDetails(data)
};
const displayDetails = (video) => {
  console.log(video)
  console.log(video.video.description)
  const detailContainer = document.getElementById('modal-content')
  detailContainer.innerHTML= `
  // <img src ="${video.video.thumbnail}"/>
  // <p>${video.video.description}</p>`
  // way - 1
  // document.getElementById('modal').click()
  // way-2 
  document.getElementById('my_modal_5').showModal()
}
// const cardDemo = {
//   category_id: "1001",
//   video_id: "aaaa",
//   thumbnail: "https://i.ibb.co/L1b6xSq/shape.jpg",
//   title: "Shape of You",
//   authors: [
//     {
//       profile_picture: "https://i.ibb.co/D9wWRM6/olivia.jpg",
//       profile_name: "Olivia Mitchell",
//       verified: "",
//     },
//   ],
//   others: {
//     views: "100K",
//     posted_date: "16278",
//   },
//   description:
//     "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey.",
// };

const displayVideo = (videos) => {
  // getting video-section
  const videoSection = document.getElementById("vidoes-section");
  videoSection.innerHTML = "";
  if (videos.length == 0) {
    videoSection.classList.remove("grid");
    videoSection.innerHTML = `<div class="min-h-[300px] flex flex-col gap-5 justify-center items-center">
        <img src="Assets/images/icon.png"/>    
        <h2 class="text-center font-bold">No content here in this category</h2>
    </div>

    `;
    return;
  } else {
    videoSection.classList.add("grid");
  }
  //looping video parameter to get one by one
  videos.forEach((video) => {
    console.log(video);
    // creating a div element inside card variable
    const card = document.createElement("div");
    // adding classList to div
    card.classList = "card card-compact";
    // adding html tags from daisy ui premade card
    card.innerHTML = `
          <figure class="h-[200px] relative">
            <img
            class="h-full w-full object-cover"
            src=${video.thumbnail}
            alt="Shoes" />
            ${
              video.others.posted_date?.length == 0
                ? ""
                : `<span class="p-2 bg-black text-white text-sm right-2 bottom-2 absolute">${getTimeString(
                    video.others.posted_date
                  )}</span>`
            }
            
        </figure>
        <div class="px-0 py-2 flex gap-2">
            <div class="h-10 w-10 rounded-full overflow-hidden"><img src=${
              video.authors[0].profile_picture
            } class="object-cover"></div>
            <div>
                <h2 class="font-bold">${video.title}</h2>
                <div class ="flex items-center gap-2">
                    <p>${video.authors[0].profile_name}</p>
                    ${
                      video.authors[0].verified === true
                        ? `<img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=p9jKUHLk5ejE&format=png"/>`
                        : ""
                    }
                  
                </div>
                <p><button onclick ="loadDetails('${
                  video.video_id
                }')" class="btn bg-error">Details</button></p>
            </div>
        </div>   
         `;
    // appending the card div to video-section
    videoSection.append(card);
  });
};

document.getElementById('search-input').addEventListener('keyup', (a)=>{
  loadVideo(a.target.value)
})
loadVideo();
