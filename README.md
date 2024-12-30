# To start the project:

- docker compose up -d --build (docker compose command may vary depending on the version)

## knows issues:

### No tests

- I was planning to do with Jest but had problems with using it in ES6 modules and mocking Sequelize. Didnt had the time to look further. Although end-points are really basic, they are written in a unit testable way.

### No documentation with Swagger

- Didnt had the time even look into it because there was a deadline.

### No Sales Service

- I planned using mongoDB for its database since every entry would have multiple stages and multiple records for every stage such as "notes". That would require a lot of different tables to perform on SQL or many many unused empty columns on tables. Wasnt implemented because of the deadline.

### No Application logic

- I started implementing things such as "only admin can update", "only admin can update someone's role to admin", "create and update multiple note entries in the customer-service", these kinds of application logic updates that made sense to me took a considerable amount of my time only to be all scraped at the end because there was never an end to it and they weren't required also. Ended up shooting myself in the foot and not deliver actual requirements.

### Only a single git commit?

- After sometime in the project I noticed this issue. But it was really hard to do commits when you're trying to implement things that you never did before because wrong implementations ended up changing too much code and I was never sure of when some implementations were "done", so I skipped.

### Other issues worth mentioning

- Axios implementation hurts my eyes too.
- You can probably very easily break a server with a faulty request, I may have not cleaned up entries well.
- Sometimes when code breaks, it returns the whole error from request. This shouldn't happen, I'm aware.
- You can probably run your code in the server with an SQL injection.
- Overall input and output sanitazion is skipped.
- Micro-services do not talk to each other because there is no logic for them to require that.
- Gateway and services should talk through JWTs specifically designed for that kind of communication and not only checking for a single JWT about user.
- I tried binding role-user tables in user-management but not in customer-note in customer-management because I wasn't clear how I should do it and couldn't spend more time to read about it and understand.

## plus sides(in my opinion):

- I realized I didn't know anything about backend until I started the implementation. I had concepts in my mind theoratically but never achitectured anything or knew about JWT or docker virtual networks or SQL. The only reason I chose SQL was because "roles" in user-management were like an ENUM and I watched a video about database normalization a year ago.

- From my perspective, I did work a lot in the backend before but I was only writing application logic in an already "ready environment". Reality hit hard and I learned a ton in the last week.

- I really wanted to do good work and deliver everything, and I tried.
