function reset($elem) {
    $elem.before($elem.clone(true));
    var $newElem = $elem.prev();
    $elem.remove();
    return $newElem;
} // end reset()

//$('document').ready(getQuote());
window.twttr = (function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0],
    t = window.twttr || {};
  if (d.getElementById(id)) return t;
  js = d.createElement(s);
  js.id = id;
  js.src = "https://platform.twitter.com/widgets.js";
  fjs.parentNode.insertBefore(js, fjs);

  t._e = [];
  t.ready = function(f) {
    t._e.push(f);
  };

  return t;
}(document, "script", "twitter-wjs"));

function getQuote() {
  $.ajax({
    url: "http://api.forismatic.com/api/1.0/",
    jsonp: 'jsonp',
    dataType: "jsonp",
    data: {
      method: "getQuote",
      format: 'jsonp',
      lang: 'en'
    },
    success: function(quote) {
      $("#tweet").html('');
      quoteText = '"' + quote.quoteText + '"';
      quoteAuthor = '--' + quote.quoteAuthor;
      $('#quote').html("<h3>" + quoteText + "</h3>");
      $('#author').html("<p>" + quoteAuthor + "</p>");
      twttr.widgets.createShareButton(
        'http://codepen.io',
        document.getElementById('tweet'), {
          count: 'none',
          size: 'large',
          text: quoteText.slice(0, 90) + ' ' + quoteAuthor
        }).then(function(el) {
        console.log("Button created.")
      });

    }
  })
};

$('#getit').on('click', function() {
  var quote = $("#quote-area");  
  var $this = $(this);
    $this.removeClass("pulse");
    $this = reset($this);
    $this.addClass("pulse");
   quote = reset(quote)
    $("#quote-area").css("display: none;")
    $("#quote-area").css({
      "display": "block",
      "animation": "zoomInUp forwards linear",
      "animation-duration": "1.5s",
      "animation-delay": 0
    });
  
  $("#tweet").fadeIn(2000);
  getQuote();
});