# Instructions

## Login
When you enter the app, you will be presented with a login page. If you have already created an account, you can simply log in with your username and password. If the credentials are incorrect, a notification will be shown. To create a new account, you can click the text beneath the *Log in* button to go to the Sign up page.

## Sign up
The sign up page is a very typical one. You only need to input a valid username and a password. You will be notified if signing up succeeds or fails. If signup is successful, you will be redirected to the login page.

## Welcome
A generic greeting page that hasn't been started yet. You can simply click **"Your songs"** button in the navigation bar to continue.

## Your songs
A page that lists the songs of the logged in user. You can sort the songs by clicking and dragging the drag button (6 dots). In the right side there is a small menu button for each song. In this menu, you will find buttons for cloning and deleting the song.

If you have no songs, you will only see a "New song" button. Pressing the "New song" button will create a template song and redirect you to that song's page.

You can also get to any song page from **Your songs** page by simply clicking the name of any song in the list.

### Cloning a song
Cloning will immediately create a clone of a song. It is useful when you want to make drastic changes to a song. Then you can simply store the old version in one song and edit the other one.

### Deleting a song
Deleting a song opens a dialog for additional confirmation. Deleted songs cannot be restored.

## Song page
In the song page, the title of the song will be shown at the top. The actual body of the song is made up of individual **sections** (the blocks with blue borders). There are two modes: normal mode for viewing the song and **edit mode** for editing it. You can switch between the modes by clicking the Edit mode switch. There is also a switch for disabling **chords**, we'll look at that later.

### Sections
Sections represent the different sections that songs generally consist of (intro, verse, chorus etc.). They have a name (for example, "Chorus") and **lines** (the lyrics + the chords). That's it.

### Edit mode
In edit mode, all changes you make will be saved only when you click the save button, excluding the permanent "Delete song". The save button will be shown only when there are unsaved changes.

You can edit the title at the top. Editing section name is simple as well. Lines are a bit more complicated. When editing lines, pressing enter will expand the text area. You can type lyrics in this area. Each row represents a line in a song. The song will be formatted based on the rows. In addition to lyrics, you can also add chords to the song with square brackets. Simply type the chord name between them (example: [Em]). Chords will be shown differently from other lyrics when you exit the edit mode. Tip: you can line up the chords above the lyrics by placing them on their own row to make the song look better!

In the edit mode you can also clone and delete individual sections by clicking the buttons below the lines. You can also sort the sections by dragging the drag handles in the middle.

You can add new sections by pressing the New section button at the bottom of the section list. You can also delete the entire song by clicking the Delete song button.

As mentioned earlier, text placed between square brackets will be shown differently from other lyrics as they are considered to be chords. If you want to disable this feature, simply click the "Show chords" switch when viewing a song.

## Navigation bar
You can turn the dark mode on and off at any time by clicking the "Dark mode" switch in the navigation bar. Lastly, you can log out of the app by clicking Log out. The app uses token based authentication, so if you leave the page without logging out and come back soon, you may be able to use it again without logging in. The tokens expire eventually. If that happens, you will see the login page again.


(Bonus experimental feature: tab will add 4 spaces in the lines text area when editing a section, very useful when lining up chords with the lyrics. It is a bit bugged and doesn't trigger "unsaved changes detected")