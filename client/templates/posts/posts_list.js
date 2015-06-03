Template.postsList.onRendered(function() {
  this.find('.wrapper')._uihooks = {
    insertElement: function(node, next) {
      $(node)
          .hide()
          .insertBefore(next)
          .fadeIn();
    },
    removeElement: function(node) {
      $(node).fadeOut(function() {
        $(this).remove();
      });
    },
    moveElement: function(node, next) {
      // Get baseline
      var $node = $(node), $next = $(next);
      var oldTop = $node.offset().top;
      var height = $node.outerHeight(true);

      // Find all elements between next and node
      var $inBetween = $next.nextUntil(node);
      if ($inBetween.length === 0) {
        $inBetween = $node.nextUntil(next);
      }

      // Put node in place
      $node.insertBefore(next);

      // Measure new top
      var newTop = $node.offset().top;

      // Move node back to baseline
      $node
          .removeClass('animate')
          .css('top', oldTop - newTop);

      // Push every other element down or up to put them back
      $inBetween
          .removeClass('animate')
          .css('top', oldTop < newTop ? height : -1 * height);

      // Force redraw
      $node.offset();

      // Animate, then move to final position
      $node.addClass('animate').css('top', 0);
      $inBetween.addClass('animate').css('top', 0);
    }
  }
});