# API Docs

## Routes
1. Diocese Routes

    /api/dioceses:
        GET: Retrieve a list of all dioceses.
        POST: Create a new diocese.

    /api/dioceses/:dioceseId:
        GET: Retrieve a single diocese by ID.
        PUT: Update an existing diocese.
        DELETE: Delete a diocese.

2. Parish Routes

    /api/parishes:
        GET: Retrieve a list of all parishes.
        POST: Create a new parish.

    /api/parishes/:parishId:
        GET: Retrieve a single parish by ID.
        PUT: Update an existing parish.
        DELETE: Delete a parish.

    /api/dioceses/:dioceseId/parishes:
        GET: Retrieve a list of parishes within a specific diocese.

3. Contribution Routes

    /api/contributions:
        GET: Retrieve a list of all contributions.
        POST: Create a new contribution.

    /api/contributions/:contributionId:
        GET: Retrieve a single contribution by ID.
        PUT: Update an existing contribution.
        DELETE: Delete a contribution.

    /api/parishes/:parishId/contributions:
        GET: Retrieve a list of contributions for a specific parish.

    /api/dioceses/:dioceseId/contributions:
        GET: Retrieve a list of contributions for a specific diocese.

4. Budget Distribution Routes

    /api/budget-distributions:
        GET: Retrieve a list of all budget distributions.
        POST: Create a new budget distribution.

    /api/budget-distributions/:distributionId:
        GET: Retrieve a single budget distribution by ID.
        PUT: Update an existing budget distribution.
        DELETE: Delete a budget distribution.

    /api/dioceses/:dioceseId/budget-distributions:
        GET: Retrieve a list of budget distributions for a specific diocese.

    /api/parishes/:parishId/budget-distributions:
        GET: Retrieve a list of budget distributions for a specific parish.

5. Reporting Routes (Optional)

    /api/reports/diocese-summary/:dioceseId:
        GET: Generate a summary report for a specific diocese (e.g., total income, total expenses, budget utilization).
    /api/reports/parish-summary/:parishId:
        GET: Generate a summary report for a specific parish.
    /api/reports/budget-performance:
        GET: Generate a report comparing budgeted amounts to actual expenditures across all dioceses or parishes.