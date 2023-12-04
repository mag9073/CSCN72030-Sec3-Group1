# CSCN72030-Sec3-Group1

## Inspiration for RiskAlert

We were inspired to give **Doctors** the ability to monitor and predict **their patients** risk for **Diabetes**, **Stroke**, and **Heart Disease** based on patient data. We wanted an *all-in-one solution* to help busy **Doctors** view **patient health trends over time** and **offer their recommendations** to the **patient** to **improve their health.**

## What RiskAlert Does

**RiskAlert** is an *all-in-one solution* to combine assessing **patient health trends over time** and offering **recommendations to improve patient health** together in a **user-friendly** and **visually engaging interface** for **Doctors**.

It allows **Doctors** to search for **their patient’s name**, **date of birth**, or **ID** to **locate their patient**. The **Doctor** will then enter patient data and **KNN algorithms** will be used to help **predict risk**.

**RiskAlert** provides a *user-friendly* and *visually engaging* interface, the **HMI Display**, for **Doctors** to interact with the system. Our **HMI Display** is a *gateway for communication* with the system to monitor their *patients* and *predict their risk* for **Diabetes**, **Stroke**, and **Heart Disease**. After the **risk assessment**, each disease is displayed on the **HMI Display** and the **Doctor** can then **write recommendations** for their **patients** regarding each disease

**Ensure** *accountability* through *communication* between **Doctor** and **their patient**.

**Prevent** *risk of disease* including **Diabetes**, **Stroke**, and **Heart Disease**.

**Provide** *recommendations* to the **patient** to **improve their health**.

**Provide** *peace of mind* for **Doctors** and **their patients**.

## How We Built It

#### Back-end

We used **Python** for the back end. Please see the **Getting Started** section for further instructions, dependency management tools, and libraries needed.


#### Front-end

We used **Python** and **Node.js** for the front end. Please see the **Getting Started** section for further instructions, dependency management tools, and libraries needed.

#### Prototype

**Adobe XD** was used to build the prototype. We used *10 Usability Heuristics for User Interface Design* to be sure the prototype was designed for as many users as possible.

From [NNG](https://www.nngroup.com/articles/ten-usability-heuristics/).

#### General

We also used **Git**, **GitHub**, **MSTeams**, and **Visual Studio Code**.


## Accomplishments We're Proud Of

We are **proud** we worked hard together over this semester. We are **proud** to be part of this **opportunity** to experiment with **new technologies** and **showcase our project**. 


## Challenges We Ran Into

This was our **first** time designing a HMI-style project together!

In the beginning, **brainstorming** *what our project should do* was a challenge. We spent **a lot of time** in meetings together  to understand **what we were looking for** as a **final project**. 

We had some technical issues *establishing communication* between our **C++ modules** and a **PyQT GUI** which is a **UI Module**, written in **Python**. We unfortunately had to convert all of our code to **Python**, despite **all of the suggestions** and **advice** received **from around the world** in the **programming community**.

## What we learned

We learned that **memos** and **note-taking** always **improve communication**.  Having **notes** also kept us **on track**. This was **true** from the **initial brainstorming** to the **final submission**. We will keep all **memos** and **notes** for **all projects** in the **future**.
We improved our **note taking**, **questioning skills**, and **documentation** to record our actions and **improve our communication**.
We **also learned** that **during times of frustration**, **solutions always appear** after **team discussions**.



## What's next for **RiskAlert**

We are hoping that we can make **RiskAlert** a reality. We hope to prevent *diseases* like **Diabetes**, **Stroke**, and **Heart Disease** and *improve communication* between **Doctors** and their patients.

# Getting Started

*Please note: after installing each library, check version*

## Install Frontend Dependencies

Prerequisites:

Nodejs Library:

https://nodejs.org/en/download/current

All other dependencies:

``cd frontend``

``npm install``

Running the localhost server for the frontend:

``npm run dev``

## Install Backend Dependencies

``cd backend``

#1: Setting up Python virtual environment

``python -m venv venv``

#2: Activate the environment

``cd venv/Scripts``

``./activate``

#4: Install pip (on Windows)

``curl https://bootst/rap.pypa.io/get-pip.py -o get-pip.py``

``python get-pip.py``

#3: Install libraries dependencies

Scikit learn library:

``pip install -U scikit-learn``

Numpy Library:

``pip install numpy``

Pandas Libray:

``pip install pandas``

Flask Library:

``pip install Flask``

Running the localhost server for the backend:

-confirm that you are in the root of the backend folder

``pwd``

Your relative path should be: backend\api.py

Once confirmed, you can now run the backend server

``set FLASK_APP=api.py``

``set FLASK_ENV=development``

``flask run``
