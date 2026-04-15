function toggleMenu(){
document.getElementById("menu").classList.toggle("active");
}

function toggleSubmenu(){
document.getElementById("submenu-e5").classList.toggle("active");
}

// Animations au scroll
const faders = document.querySelectorAll('.fade-up');
const appearOptions = { threshold: 0.2 };

const appearOnScroll = new IntersectionObserver(function(entries, observer){
entries.forEach(entry=>{
if(!entry.isIntersecting) return;
entry.target.classList.add('visible');
observer.unobserve(entry.target);
});
}, appearOptions);

faders.forEach(fader=>{
appearOnScroll.observe(fader);
});