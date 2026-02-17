(function () {
  var article = document.querySelector('.chronicle[data-post-key]');
  if (!article || !window.localStorage) return;

  var postKey = article.getAttribute('data-post-key');
  var likesKey = 'fireside:likes:' + postKey;
  var likedKey = 'fireside:liked:' + postKey;

  var likeButton = document.getElementById('like-button');
  var likeCount = document.getElementById('like-count');

  if (!likeButton || !likeCount) return;

  function getLikes() {
    return Number(localStorage.getItem(likesKey) || '0');
  }

  function renderLikes() {
    var likes = getLikes();
    var liked = localStorage.getItem(likedKey) === '1';
    likeCount.textContent = String(likes);
    likeButton.setAttribute('aria-pressed', liked ? 'true' : 'false');
    likeButton.classList.toggle('liked', liked);
  }

  likeButton.addEventListener('click', function () {
    var liked = localStorage.getItem(likedKey) === '1';
    var likes = getLikes();

    if (liked) {
      likes = Math.max(0, likes - 1);
      localStorage.setItem(likedKey, '0');
    } else {
      likes += 1;
      localStorage.setItem(likedKey, '1');
    }

    localStorage.setItem(likesKey, String(likes));
    renderLikes();
  });

  renderLikes();
})();
