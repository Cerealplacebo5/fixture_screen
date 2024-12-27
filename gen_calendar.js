const generate_calendar_grid = (day, month, year) => {

    let target_date = new Date();
    // Set as the first day of the month
    target_date.setDate(day);
    // Set the month according to the props
    target_date.setMonth(month);
    // Set the years according to the props
    target_date.setFullYear(year);

    // Begin to create a grid of each week
    let grid = [[]];
    let row = 0, i = 0;
    let is_current_month = true;
    let current_month = target_date.getMonth();
    let month_start = new Date(target_date.setDate(1));
    let next_month = new Date(target_date.getFullYear(), current_month + 1, 1);

    // Fill the array with empty cell if month doesn't start on monday
    let day_start = month_start.getDay();
    // 0 is sunday, but we want to start on monday
    if (day_start === 0) day_start = 7;

    while (i < day_start - 1) {
        grid[0][i] = {};
        i++;
    }

    // While in the current month
    while (is_current_month) {
        // Initialise the array
        if (!Array.isArray(grid[row])) grid[row] = [];
        // Complete the week
        while (i < 7) {
            // Check if we are still in the current month
            if (!is_current_month || month_start.getTime() >= next_month.getTime()) {
                is_current_month = false;
                i++;
            }
            // Log the current day and pass on to the next one
            else {
                grid[row][i] = { day_month: month_start.getDate() };
                month_start.setDate(month_start.getDate() + 1);
                i++;
            }
        }
        // reset the week
        row++;
        i = 0;
    }

    return grid;
}

export default generate_calendar_grid;