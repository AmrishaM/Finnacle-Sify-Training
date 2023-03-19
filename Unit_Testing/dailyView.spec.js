describe('Daily View', () => {
    beforeEach(() => {
      document.body.innerHTML = `
        <div>
          <input id="dailyView-date" class="datepicker" type="text" />
          <button id="search-day-expense">Search</button>
          <table id="dayExpenseTable">
            <thead>
              <tr>
                <th>Index</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Category</th>
                <th>More info</th>
                <th>Comments</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      `;
      localStorage.setItem('expenses', JSON.stringify([
        ['2023-03-18', 10, 'info', 'comment', 'category1'],
        ['2023-03-18', 20, 'info', 'comment', 'category2'],
        ['2023-03-17', 30, 'info', 'comment', 'category1'],
        ['2023-03-16', 40, 'info', 'comment', 'category2'],
      ]));
    });
  
    it('should filter and display day records correctly', () => {
      $('#dailyView-date').val('2023-03-18').trigger('change');
      $('#search-day-expense').trigger('click');
      const tableRows = $('#dayExpenseTable tbody tr');
      expect(tableRows.length).toBe(2);
      expect(tableRows.eq(0).find('td').eq(1).text()).toBe('2023-03-18');
      expect(tableRows.eq(0).find('td').eq(2).text()).toBe('10');
      expect(tableRows.eq(0).find('td').eq(3).text()).toBe('category1');
      expect(tableRows.eq(0).find('td').eq(4).text()).toBe('info');
      expect(tableRows.eq(0).find('td').eq(5).text()).toBe('comment');
      expect(tableRows.eq(1).find('td').eq(1).text()).toBe('2023-03-18');
      expect(tableRows.eq(1).find('td').eq(2).text()).toBe('20');
      expect(tableRows.eq(1).find('td').eq(3).text()).toBe('category2');
      expect(tableRows.eq(1).find('td').eq(4).text()).toBe('info');
      expect(tableRows.eq(1).find('td').eq(5).text()).toBe('comment');
    });
  
    it('should show a message if no records found', () => {
      $('#dailyView-date').val('2023-03-19').trigger('change');
      $('#search-day-expense').trigger('click');
      const tableRows = $('#dayExpenseTable tbody tr');
      expect(tableRows.length).toBe(0);
      const message = $('#dayExpenseTable tbody .alert');
      expect(message.length).toBe(1);
      expect(message.text()).toBe(' sorry no records found');
    });
  });
  