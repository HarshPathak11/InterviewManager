# Project README

## Setup Instructions

1. Clone or fork the project from the GitHub repository.
2. Install the necessary dependencies by running:
   ```bash
   npm install
   ```
3. Start the development server with the command:
   ```bash
   npm run dev
   ```

## Design Decisions

1. **Viewing Modes**:

   - The app supports two viewing modes:
     - **List View**: Displays interviews in a customizable, filterable list format with options to edit and delete entries.
     - **GUI-Based View**: Utilizes FullCalendar for a drag-and-drop interface, enabling easy scheduling of interviews.

2. **Scheduling Constraints**:

   - The file `constants.js` defines the allowable hours for scheduling interviews. By default, interviews can only be scheduled between **9:00 AM and 6:00 PM**.

3. **Notifications**:

   - Users are notified of updates or scheduling actions.
   - An **Email Dashboard** page logs mock email activities related to scheduling and updates.

4. **UI Design**:

   - The application features a sleek, visually appealing, and fully mobile-responsive design.

5. **Tech Stack**:

   - **Frontend**: React, Redux with Local Storage.
   - **UI Features**: FullCalendar, CSS-in-JS, React Drag-and-Drop.

## Assumptions

1. **Scheduling Time Frame**:

   - Interviews are restricted to the hours between **9:00 AM and 6:00 PM**, as defined in `constants.js`.

2. **Email Functionality**:

   - The email logs on the Email Dashboard are mock logs used to simulate email notifications. No actual emails are sent.

## Challenges Faced

- Ensuring the application is fully responsive across all devices while maintaining a visually consistent design.
- Implementing drag-and-drop functionality seamlessly within the FullCalendar component.
- Creating a notification system that effectively informs users of scheduling and updates while integrating email log simulation.

---

Feel free to contribute or raise issues on the GitHub repository!

