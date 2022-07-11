const createCommentElement = ({ name, comment, timestamp }) => {
  const rowElement = document.createElement('tr');

  const nameElement = document.createElement('td');
  nameElement.innerHTML = name;

  const commentElement = document.createElement('td');
  commentElement.innerHTML = comment;

  const timestampElement = document.createElement('td');
  timestampElement.innerHTML = timestamp;

  rowElement.appendChild(timestampElement);
  rowElement.appendChild(nameElement);
  rowElement.appendChild(commentElement);

  return rowElement;
};

const clearComments = (commentSection) => {
  const commentsElement = document.querySelector('#comments');
  commentSection.removeChild(commentsElement);
};

const writeComments = (xhr) => {
  const commentSection = document.querySelector('.comment-section');
  clearComments(commentSection);

  const commentsElement = document.createElement('tbody');
  commentsElement.id = 'comments';

  const comments = JSON.parse(xhr.response);
  comments.forEach(comment => {
    const commentElement = createCommentElement(comment)
    commentsElement.appendChild(commentElement);
  });

  commentSection.appendChild(commentsElement);
};

const xhrRequest = (callback, statusCode, method, resource, body = '') => {
  const xhr = new XMLHttpRequest();

  xhr.onload = () => {
    if (xhr.status === statusCode) {
      callback(xhr);
      return;
    }
    console.error('Unalbe to serve request');
  };

  xhr.open(method, resource);
  xhr.send(body);
};

const displayComment = () => {
  xhrRequest(writeComments, 200, 'GET', '/api/comments');
};

const postComment = () => {
  const formElement = document.querySelector('#comment-form');
  const formData = new FormData(formElement);
  const body = new URLSearchParams(formData);

  xhrRequest(displayComment, 201, 'POST', '/add-comment', body);
  formElement.reset();
};

const main = () => {
  const postButtonElement = document.querySelector('#post-comment');
  postButtonElement.onclick = postComment;
}

window.onload = main;
