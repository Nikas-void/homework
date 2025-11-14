const movieList = document.getElementById("container");
const searchInput = document.getElementById("searchInput");
let movies = [];


const displayMovies = (movies) => {
  for (let i = 0; i < movies.length; i++) {
    const box = document.createElement("div");
    const movie = movies[i];
    box.classList.add("item");

    box.innerHTML = `
    <div class="flex flex-col  rounded-2xl overflow-hidden transition-transform transition-shadow duration-300 ease-in-out cursor-pointer hover:-translate-y-2 hover:shadow-lg ">
    <img class=" w-fit h-110 " src="https://image.tmdb.org/t/p/w500${movie.poster_path}"/>
    <div class="bg-gray-700 p-2 gap-2 flex flex-col ">
    <p class=" text-[20px] font-bold h-[2lh]" >${movie.title}</p>
    <span>${movie.release_date}</span>
    <span class="bg-blue-500 flex w-fit p-1.5   rounded-2xl text-white ">★ ${movie.vote_average.toPrecision(2)}</span>     
     <span class="line-clamp-3 " >${movie.overview}</span>
    </div>
    </div>`;
    movieList.appendChild(box);
  }
}

async function main() {
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/popular?api_key=8476a7ab80ad76f0936744df0430e67c&language=en-US&page=1"
  );
  const data = await response.json();
  console.log(data);
  displayMovies(data.results)
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const filteredmovie = searchInput.value.toLowerCase();
      const filtered = data.results.filter((movie) =>
        movie.title.toLowerCase().includes(filteredmovie)
      );
      movieList.innerHTML = ""
      displayMovies(filtered)
    }
  });
}

main();
