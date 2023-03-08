# User managerment assignment

## Deployment

<https://user-managerment-twendee.onrender.com/>

## Intall

After clone this repository. At root folder, run following command to run.

```bash
# with yarn
yarn
yarn preview

# with npm
npm i
npm run preview
```

## Implementations

### Without sort implementation.

Query data for each page.

```ts
const { page, results } = useUserStore();
const userQuery = useQuery({
    queryKey: ["users", page, results],
    queryFn: () => getUsers({ page, results }),
    staleTime: Infinity,
});
const { data, isLoading, isError } = userQuery;
```

Pass data to the UserTable component to display the results

```ts
return <UserTable users={data?.results} isLoading={isLoading} />;
```

### With sort implementation;

Get all data (100 users).

```ts
const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers({ page: 0, results: 100 }),
    staleTime: Infinity,
});
const { data, isError, isLoading } = usersQuery;
```

Then filter out the necessary data with getUsersByFilter function to display on the table.

```ts
const users = getUsersByFilter(data.results, { page, results, sortBy });
return <UserTable users={users} isLoading={false} sort={true} />;
```
