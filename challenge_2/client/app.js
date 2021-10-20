$(document).ready(function () {
  var $csvViewer = $('#csvViewer');
  var $csvInput = $('#csvInput');

  $('form').on('submit', function(event) {
    event.preventDefault();
    console.log($csvInput);

    $.ajax({
      method: 'POST',
      url: '/upload_json',
      data: {value: $csvInput[0].value},
      success: (result) => { $csvViewer.text(result) }
    })
  })
});

