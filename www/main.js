$(function() {
  $.ajax({
    url: 'https://lcboapi.com/products',
    headers: { 'Authorization': 'Token MDozODkwMzMwYS0wOWJlLTExZTUtYjg0OC1jMzU5ZmNmYjNmN2I6SzVadWg0WVVWNUFkQUc4SnR6NFFuS0I5YzdqbEtBbVBtb3A5' }
  }).then(function(data) {
      console.log(data);
  });
});
