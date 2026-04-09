# Rocket Rivals Drupal Site

Welcome to the official repository for the **Rocket Rivals** web platform. Rocket Rivals is a premier league dedicated to high-level *Rocket League* players, built on a foundation of three core pillars:

* **Fun:** An engaging and enjoyable experience for the community
* **Fair:** Transparent, structured leagues and unbiased moderation
* **Competitive:** A community desgined to facilitate elite team-based gameplay and synergy

We have competitive divisions of 3 tiers:

- **Challengers**     [ Champion 1  --- Champion 3 ]


- **Legends**   [ Grand Champion 1  --- Grand Champion 2 ]


- **Titans**   [ Grand Champion 3  --- Supersonic Legend ]

Feel free to join our discord and get to know us if you're interested!
https://discord.gg/593WCuF9


This is a Drupal Based Project, and I've included the steps and tools to clone this project for personal use and adaptation. The site is a work in progress and learning experience for me. If anyone has recommendations or experiences bugs please share them so I can look into updating this project!

*Thank You*

---

## 🛠 Tech Stack

* **CMS:** Drupal 10/11
* **Local Environment:** DDEV
* **Database:** MariaDB / MySQL
* **Language:** PHP 8.2+

---

## 🚀 Getting Started

Follow these steps to get a local copy of the site up and running.

### Prerequisites
Ensure you have the following installed on your machine:
* [Docker](https://www.docker.com/get-started)
* [DDEV](https://ddev.readthedocs.io/en/stable/users/install/ddev-installation/)

### Installation & Local Development

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/rocket-rivals-drupal.git](https://github.com/your-username/rocket-rivals-drupal.git)
    cd rocket-rivals-drupal
    ```

2.  **Start the environment:**
    ```bash
    ddev start
    ```

3.  **Install dependencies:**
    ```bash
    ddev composer install
    ```

4.  **Import Database & Config (if available):**
    If you have a database export:
    ```bash
    ddev import-db --src=path/to/dump.sql
    ddev drush config-import
    ```
    *Or, for a fresh install:*
    ```bash
    ddev drush site-install --account-name=admin --account-pass=admin
    ```

5.  **Launch the site:**
    ```bash
    ddev launch
    ```

---

## 🏗 Deployment

This project is configured for a standard Drupal deployment workflow.

1.  **Build:** Run `composer install --no-dev` to prepare the production vendor directory.
2.  **Artifacts:** Ensure the `web/sites/default/settings.php` contains the appropriate environment variables for your production server.
3.  **Updates:** After pushing code, always run database updates and config imports:
    ```bash
    drush updb -y
    drush cim -y
    drush cr
    ```

---

## 🤝 Contributing

We welcome contributions from the community! Whether it's a bug fix, a new feature for the league, or styling improvements:
1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
