var $ = require('jquery');

class Query {

  constructor(url, options) {

    this.url = url;
    this.options = options || {};

    this.requestParams = {
      method: 'GET',
      url: url,
    };

    this.data = [];

    /**
     * Filter Properties
     */
    this.limit = this.options.limit||15;
    this.filters = {};
    this.lastSearch = false;

    /**
     * Paging properties
     */
    this.page = 1;
    this.pages = 1;
    this.count = 0;

    /**
     * Sorting properties
     */
    this.sortBy = '';
    this.sortAsc = false;
    
  }

  find() {

        var self = this,
            params = {limit: this.limit, page: this.page};

        /**
         * Query Filters/Conditions
         */
        if (!$.isEmptyObject(this.filters)) {
          $.each(this.filters, function (prop, val) {
            params[prop] = val;
          });
        }
        // If filter was changed, reset the page to 1, update the query
        this.page = this.lastSearch !== this.filters ? 1 : this.page;


        /**
         * Query Sorting
         */
        if (this.sortBy) {
          params.sort = this.sortBy;
          params.sortAsc = !!this.sortAsc ? '' : '-';
        }

        /**
         * Start Request
         */

        $({
          url: this.url,
          data: this.filters
        }).then(function(response) {

            var data = response.data;

            if (data) {

              /**
               * Instantiate record Models
               *  - if options:  {model: <Model>}
               */
              if (self.options.model) {
                self.data = [];
                $.each(data.data, function (i, dt) {
                  self.data.push(new self.options.model(dt));
                });

              // Load basic collection
              } else {
                self.data = data.data;
              }

              // Paging/count
              self.count = data.count;
              self.pages = Math.ceil(data.count / self.limit);
            }

            /**
             * Success Callback
             */
            (self.success||noop)(response)

        }, (self.error||noop));

      }

  sort(prop, direction) {
    this.sortBy = prop || this.sortBy;
    this.sortAsc = this.sortBy == prop
      ? !this.sortAsc
      : false;

    this.find();
  }

  movePage(page) {
    if (~~page > 0 && ~~page <= this.pages) {
      this.page = page;
      this.find();
    }
  }

  next() {
    this.movePage(this.page + 1);
  }

  prev() {
    this.movePage(this.page - 1);
  }

  getPages() {
    function range (a, b, step) {
        var A= [];if(typeof a== 'number'){A[0]= a;step= step || 1;while(a+step<= b){A[A.length]= a+= step;}}else{var s= 'abcdefghijklmnopqrstuvwxyz';if(a=== a.toUpperCase()){b=b.toUpperCase();s= s.toUpperCase();}s= s.substring(s.indexOf(a), s.indexOf(b)+ 1);A= s.split('');        }return A;
    }
    return range(1, this.pages);
  }

}

module.exports = Query;