class Pagination {
  constructor({
    page = 1,
    pageSize = 5,
  }) {
    this.count = 0;
    this.total = 0;
    this.page = page < 0 ? 1 : Math.ceil(page);
    this.pageSize = pageSize < 0 ? 5 : Math.ceil(pageSize);
    this.skipCount = this.page * this.pageSize - this.pageSize;
  }

  paginate(items = [], total) {
    this.total = total;
    this.count = items.length;

    return {
      items,
      pagination: {
        page: this.page,
        count: this.count,
        total: this.total,
        pageSize: this.pageSize,
      },
    };
  }
}

module.exports = Pagination;
