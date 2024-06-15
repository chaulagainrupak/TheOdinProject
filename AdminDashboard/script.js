
window.onload = function () {
    navBarWriter();
}


document.addEventListener('DOMContentLoaded', function() {
    const postsContainer = document.querySelector('.posts');
  
    // Fetch the JSON data
    fetch('posts.json')
      .then(response => response.json())
      .then(data => {
        // Iterate through each post in the JSON data
        data.posts.forEach((post, index) => {
          // Create elements for each post
          const postElement = document.createElement('div');
          postElement.classList.add('post' + (index + 1), 'card'); // Add unique class for each post
  
          const sideCardElement = document.createElement('div');
          sideCardElement.classList.add('sideCard');
          postElement.appendChild(sideCardElement);
  
          const cardContentElement = document.createElement('div');
          cardContentElement.classList.add('cardContent');
          postElement.appendChild(cardContentElement);
  
          const titleElement = document.createElement('h1');
          titleElement.textContent = post.title;
          cardContentElement.appendChild(titleElement);
  
          const dateElement = document.createElement('h5');
          dateElement.textContent = post.date;
          cardContentElement.appendChild(dateElement);
  
          const cardDescElement = document.createElement('div');
          cardDescElement.classList.add('cardDesc');
          cardContentElement.appendChild(cardDescElement);
  
          const descriptionElement = document.createElement('p');
          descriptionElement.textContent = post.description;
          cardDescElement.appendChild(descriptionElement);
  
          const reactionsElement = document.createElement('div');
          reactionsElement.classList.add('reactions');
          cardContentElement.appendChild(reactionsElement);
  
          // Add reaction images
          post.reactions.forEach(reaction => {
            const imgElement = document.createElement('img');
            imgElement.src = reaction;
            imgElement.alt = 'reactionIcon';
            reactionsElement.appendChild(imgElement);
          });
  
          // Append the entire post element to the posts container
          postsContainer.appendChild(postElement);
        });
      })
      .catch(error => console.error('Error fetching JSON:', error));


      const announcementsContainer = document.querySelector('.announcements');
      const trendingContainer = document.querySelector('.trending');
    
      // Function to load and render announcements
      function loadAnnouncements() {
        fetch('announcements.json')
          .then(response => response.json())
          .then(data => {
            data.announcements.forEach(announcement => {
              const announcementElement = document.createElement('div');
              announcementElement.classList.add('announcement1');
    
              const titleElement = document.createElement('h3');
              titleElement.textContent = announcement.title;
              announcementElement.appendChild(titleElement);
    
              const descriptionElement = document.createElement('p');
              descriptionElement.textContent = announcement.description;
              announcementElement.appendChild(descriptionElement);
    
              announcementsContainer.appendChild(announcementElement);
            });
          })
          .catch(error => console.error('Error fetching announcements:', error));
      }
    
      // Function to load and render trending topics
      function loadTrendingTopics() {
        fetch('trending.json')
          .then(response => response.json())
          .then(data => {
            data.trending.forEach(topic => {
              const topicElement = document.createElement('div');
              topicElement.classList.add('trendingTopic');
    
              const titleElement = document.createElement('h3');
              titleElement.textContent = topic.title;
              topicElement.appendChild(titleElement);
    
              const descriptionElement = document.createElement('p');
              descriptionElement.textContent = topic.description;
              topicElement.appendChild(descriptionElement);
    
              trendingContainer.appendChild(topicElement);
            });
          })
          .catch(error => console.error('Error fetching trending topics:', error));
      }
    
      // Load announcements and trending topics when the DOM content is loaded
      loadAnnouncements();
      loadTrendingTopics();
  });
  







let navBarItems = [
    ['Dashboard', '📦'],
    ['Homepage', '🏠'],
    ['Profile', '🪪'],
    ['Messages', '💬'],
    ['History', '🕒'],
    ['Tasks', '☑️'],
    ['Settings', '⚙️'],
    ['Privacy', '🎭'],
];

let navBarWriter = () => {

    let cssRoot = getComputedStyle(document.querySelector(':root'));
    let div = document.createElement('div');



    for(let i = 0; i < navBarItems.length; i++){

        let nav = document.querySelector('.navBar');


        if (navBarItems[i][0] == 'Dashboard'){
            div.style.fontSize = '2.5rem';
            div.style.marginTop = '3rem';
            div.style.marginBottom = '5rem';
            div.textContent = navBarItems[i][1] + navBarItems[i][0];
            nav.appendChild(div);
        }else{
            let a = document.createElement('a');
            let urlDiv = document.createElement('div');
            urlDiv.style.marginTop = '2rem';
            urlDiv.style.height = '5rem';
            a.setAttribute('href', '#');
            a.setAttribute('class', 'links');
            a.textContent = navBarItems[i][1] + navBarItems[i][0];
            a.style.textDecoration = 'none';
            urlDiv.appendChild(a);
            
            nav.appendChild(urlDiv);
        }
        
        console.log('Navbar Items Written!');
    }
}   