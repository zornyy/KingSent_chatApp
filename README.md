# KingSent ChatApp

**KingSent is a React project created by @Zorny**

## <u>What is It</u>
> ⚡ - Real time chat application\
> 🚪 - Different chat rooms\
> 💡 - Possibility to create chat rooms\
> 🌍 - General chat canal\

## How to start it

> ### 💾 - Download the project
> - Download the zip of the project or clone it from a fork
> - Open the project folder in VS-Code
> ### 📚 - Connect to a Databse
> - Download the pocketbase executable from <a href="https://pocketbase.io/docs/" >Pocketbase</a>
> - Place the pocketbase.exe file in your project folder 
> - In the powershell terminal run **npm install pocketbase** and **./pocketbase serve**
> - Open the admin UI and create and admin account and create the database following the <a href="#PB_Config" >PB configuration</a>
> ### 💻 - Run the App
> - The app is built with Vite + React
> - Open a new terminal (Don't kill the pocketbase terminal) and run **npm run dev** to start the app

<br>
<br>



# <div id="PB_Config">Pocketbase Configuration </div>
> ## Tables
> - ### users
>   - **id** *SystemField*
>   - **username** *SystemField*
>   - **email** *SystemField*
>   - **created** *SystemField*
>   - **updated** *SystemField*
>   - **name** *TextField*
>   - **biography** *TextField*
>   - **status** *TextField*
> - ### chat_room
>   - **id** *SystemField*
>   - **created** *SystemField*
>   - **updated** *SystemField*
>   - **name** *TextField*
>   - **description** *TextField*
> - ### messages
>   - **id** *SystemField*
>   - **created** *SystemField*
>   - **updated** *SystemField*
>   - **content** *TextField*
>   - **user_id** *RelationField*
>   - **chat_room_id** *RelationField*

