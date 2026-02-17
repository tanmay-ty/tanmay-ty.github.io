(function () {
  var article = document.querySelector('.article[data-post-key]');
  if (!article || !window.localStorage) {
    return;
  }

  var postKey = article.getAttribute('data-post-key');
  var likesKey = 'fireside:likes:' + postKey;
  var likedKey = 'fireside:liked:' + postKey;
  var commentsKey = 'fireside:comments:' + postKey;

  var likeButton = document.getElementById('like-button');
  var likeCount = document.getElementById('like-count');
  var commentForm = document.getElementById('comment-form');
  var commentsList = document.getElementById('comments-list');

  function getLikes() {
    return Number(localStorage.getItem(likesKey) || '0');
  }

  function getComments() {
    try {
      var raw = localStorage.getItem(commentsKey) || '[]';
      var parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (_error) {
      return [];
    }
  }

  function saveComments(comments) {
    localStorage.setItem(commentsKey, JSON.stringify(comments));
  }

  function renderLikes() {
    var likes = getLikes();
    var liked = localStorage.getItem(likedKey) === '1';
    likeCount.textContent = String(likes);
    likeButton.setAttribute('aria-pressed', liked ? 'true' : 'false');
    likeButton.classList.toggle('liked', liked);
  }

  function renderComments() {
    var comments = getComments();
    commentsList.innerHTML = '';

    if (comments.length === 0) {
      var emptyState = document.createElement('li');
      emptyState.className = 'comment-empty';
      emptyState.textContent = 'No comments yet — be the first to add one.';
      commentsList.appendChild(emptyState);
      return;
    }

    comments.forEach(function (comment) {
      var item = document.createElement('li');
      item.className = 'comment-item';

      var meta = document.createElement('p');
      meta.className = 'comment-meta';
      meta.textContent = comment.name + ' · ' + new Date(comment.timestamp).toLocaleString();

      var body = document.createElement('p');
      body.className = 'comment-body';
      body.textContent = comment.message;

      item.appendChild(meta);
      item.appendChild(body);
      commentsList.appendChild(item);
    });
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

  commentForm.addEventListener('submit', function (event) {
    event.preventDefault();

    var formData = new FormData(commentForm);
    var name = String(formData.get('name') || '').trim();
    var message = String(formData.get('message') || '').trim();

    if (!name || !message) {
      return;
    }

    var comments = getComments();
    comments.unshift({
      name: name,
      message: message,
      timestamp: new Date().toISOString(),
    });

    saveComments(comments);
    commentForm.reset();
    renderComments();
  });

  renderLikes();
  renderComments();
})();
