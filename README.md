# TNT Registration App

This project has been developed for the technical assignment of the TNT job interview.

You can see the application live on [tnt.forcrowd.org](http://tnt.forcrowd.org).

Here are [the details of the assignment](https://github.com/coni2k/TNT-Registration-App/blob/master/docs/Web-Coding-Challenge.pdf).

## Stack

- Angular: 12.x
- Typescript: 4.x
- node: 12.x
- npm: 6.x

## Setup

- Download or clone the project: `git clone https://github.com/coni2k/TNT-Registration-App.git`
- Install npm dependencies: `npm i`
- Run the application: `npm start`
- Open the application in your browser: http://localhost:4200

## Test & Build

- The application contains 19 unit tests. To run them, execute the following command: `npm test`
- To create a production build, execute the following command: `ng build`

## Remarks

- I added "compare passwords" and "maxLength" validations as a bonus.
- I wrote 19 unit tests, mainly for the validations. I didn't add any "registration form" and "registration service" tests since I don't think they would've added value for this assignment.
- About the email validation, I used the default email validator of Angular, which should be enough. In a real-life scenario, the back-end would send a verification email for an actual confirmation.

## Further help

If you have any question about the project, please feel free to contact me on [Twitter](https://twitter.com/coni2k) or [LinkedIn](https://www.linkedin.com/in/serkanholat/)
