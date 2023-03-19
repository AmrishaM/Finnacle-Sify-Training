describe('Expense Filter', () => {
  let expenses = [
    ['03/15/2023', '50.00', 'Description', 'Comment', 'Category 1'],
    ['03/17/2023', '100.00', 'Description', 'Comment', 'Category 2'],
    ['03/19/2023', '75.00', 'Description', 'Comment', 'Category 1']
  ];

  beforeEach(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
    spyOn(console, 'log');
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should filter expenses by date range, expense range, and category', () => {
    // Arrange
    $('#dateRangeStart').val('03/16/2023');
    $('#dateRangeEnd').val('03/20/2023');
    $('#expenseRangeStart').val('60');
    $('#expenseRangeEnd').val('90');
    $('#dropdownMenuButton').text('Category 1');

    // Act
    $('#filer-results').click();

    // Assert
    expect($('#filteredExpenseTable tbody tr').length).toBe(1);
    expect($('#filteredExpenseTable tbody tr td:nth-child(2)').text()).toBe('03/19/2023');
    expect($('#filteredExpenseTable tbody tr td:nth-child(3)').text()).toBe('75.00');
    expect($('#filteredExpenseTable tbody tr td:nth-child(4)').text()).toBe('Category 1');
    expect(console.log).toHaveBeenCalledWith('03/16/2023', '03/20/2023', '60', '90', 'Category 1', [], expenses, expenses.slice(0, 2));
  });

  it('should display a warning message when no expenses match the filter criteria', () => {
    // Arrange
    $('#dateRangeStart').val('03/20/2023');
    $('#dateRangeEnd').val('03/22/2023');
    $('#expenseRangeStart').val('10');
    $('#expenseRangeEnd').val('20');
    $('#dropdownMenuButton').text('Category 3');

    // Act
    $('#filer-results').click();

    // Assert
    expect($('#filteredExpenseTable tbody tr').length).toBe(0);
    expect($('#filteredExpenseTable tbody .alert-warning').length).toBe(1);
    expect(console.log).toHaveBeenCalledWith('03/20/2023', '03/22/2023', '10', '20', 'Category 3', [], expenses, []);
  });
});