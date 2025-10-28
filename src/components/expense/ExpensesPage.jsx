export const ExpensesPage = () => {
    if (process.env.NODE_ENV === 'development') {
        console.log('Running in development mode');
    } else {
        console.log('Running in production mode');
    }
    return (<>
        Expense Page
    </>)
}