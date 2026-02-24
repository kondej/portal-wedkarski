import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { use } from "react";

const resources = {
  pl: {
    translation: {
      nav: {
        home: "Strona Główna",
        fisheries: "Łowiska",
        species: "Gatunki Ryb",
        myCatches: "Moje Połowy",
        allCatches: "Wszystkie Połowy",
        login: "Logowanie",
        register: "Rejestracja",
        logout: "Wyloguj",
        admin: "Admin",
        cancelButton: "Anuluj",
        nextPageButton: "Następna Strona",
        previousPageButton: "Poprzednia Strona"
      },
      home: {
        title: "Witaj na portalu Szczupak!",
        description: "To najlepsze miejsce dla pasjonatów wędkarstwa. Zapisuj swoje połowy i odkrywaj nowe łowiska.",
      },
      footer: {
        copyright: "Szczupak – Portal Wędkarski"
      },
      header: {
        title: "Szczupak – Portal Wędkarski"
      },
      login: {
        title: "Zaloguj się do Szczupak",
        emailPlaceholder: "Adres email",
        passwordPlaceholder: "Hasło",
        submitButton: "Zaloguj się",
        noAccountText: "Nie masz konta?",
        registerLink: "Zarejestruj się tutaj"
      },
      register: {
        title: "Zarejestruj się w Szczupak",
        firstNamePlaceholder: "Imię",
        lastNamePlaceholder: "Nazwisko",
        emailPlaceholder: "Adres email",
        passwordPlaceholder: "Hasło",
        submitButton: "Zarejestruj się",
        haveAccountText: "Masz już konto?",
        loginLink: "Zaloguj się tutaj"
      },
      species: {
        title: "Gatunki Ryb",
        addSpeciesButton: "Dodaj Nowy Gatunek",
        speciesNameHeader: "Nazwa Gatunku",
        actionsHeader: "Akcje",
        editButton: "Edytuj",
        deleteButton: "Usuń",
        noRecords: "Brak gatunków! Dodaj nowy gatunek."
      },
      newSpecies: {
        title: "Dodaj Nowy Gatunek",
        speciesNamePlaceholder: "Nazwa Gatunku",
        submitButton: "Dodaj Gatunek"
      },
      editSpecies: {
        title: "Edytuj Gatunek",
        speciesNamePlaceholder: "Nazwa Gatunku",
        submitButton: "Zapisz Zmiany"
      },
      fisheries: {
        title: "Łowiska",
        addFisheryButton: "Dodaj Nowe Łowisko",
        fisheryNameHeader: "Nazwa Łowiska",
        fisheryTypeHeader: "Typ Łowiska",
        locationHeader: "Lokalizacja",
        actionsHeader: "Akcje",
        descriptionHeader: "Opis",
        editButton: "Edytuj",
        deleteButton: "Usuń",
        selectTypePlaceholder: "Wybierz Typ Łowiska",
        noRecords: "Brak łowisk! Dodaj nowe łowisko."
      },
      detailsFishery: {
        title: "Szczegóły Łowiska",
        fisheryNameHeader: "Nazwa Łowiska",
        fisheryTypeHeader: "Typ Łowiska",
        locationHeader: "Lokalizacja",
        descriptionHeader: "Opis",
        notFoundText: "Łowisko nie zostało znalezione.",
        backButton: "Powrót"
      },
      newFishery: {
        title: "Dodaj Nowe Łowisko",
        fisheryNamePlaceholder: "Nazwa Łowiska",
        locationPlaceholder: "Lokalizacja",
        submitButton: "Dodaj Łowisko"
      },
      editFishery: {
        title: "Edytuj Łowisko",
        fisheryNamePlaceholder: "Nazwa Łowiska",
        locationPlaceholder: "Lokalizacja",
        submitButton: "Zapisz Zmiany"
      },
      catches: {
        title: "Połowy",
        addCatchButton: "Dodaj Nowy Połów",
        dateHeader: "Data",
        weightHeader: "Waga (g)",
        speciesHeader: "Gatunek",
        fisheryHeader: "Łowisko",
        actionsHeader: "Akcje",
        userHeader: "Użytkownik",
        editButton: "Edytuj",
        deleteButton: "Usuń",
        selectSpeciesPlaceholder: "Wybierz Gatunek",
        selectFisheryPlaceholder: "Wybierz Łowisko",
        noRecords: "Brak połowów! Dodaj nowy połów."
      },
      newCatch: {
        title: "Dodaj Nowy Połów",
        datePlaceholder: "Data",
        weightPlaceholder: "Waga (g)",
        speciesPlaceholder: "Gatunek",
        fisheryPlaceholder: "Łowisko",
        submitButton: "Dodaj Połów"
      },
      editCatch: {
        title: "Edytuj Połów",
        datePlaceholder: "Data",
        weightPlaceholder: "Waga (g)",
        speciesPlaceholder: "Gatunek",
        fisheryPlaceholder: "Łowisko",
        submitButton: "Zapisz Zmiany"
      }
    }
  },
  en: {
    translation: {
      nav: {
        home: "Home",
        fisheries: "Fisheries",
        species: "Fish Species",
        myCatches: "My Catches",
        allCatches: "All Catches",
        login: "Login",
        register: "Register",
        logout: "Logout",
        admin: "Admin",
        cancelButton: "Cancel",
        nextPageButton: "Next Page",
        previousPageButton: "Previous Page"
      },
      home: {
        title: "Welcome to Szczupak!",
        description: "The best place for fishing enthusiasts. Save your catches and discover new fisheries.",
      },
      footer: {
        copyright: "Szczupak – The Fishing Website"
      },
      header: {
        title: "Szczupak – The Fishing Website"
      },
      login: {
        title: "Log in to Szczupak",
        emailPlaceholder: "Email Address",
        passwordPlaceholder: "Password",
        submitButton: "Log In",
        noAccountText: "Don't have an account?",
        registerLink: "Register here"
      },
      register: {
        title: "Register at Szczupak",
        firstNamePlaceholder: "First Name",
        lastNamePlaceholder: "Last Name",
        emailPlaceholder: "Email Address",
        passwordPlaceholder: "Password",
        submitButton: "Register",
        haveAccountText: "Already have an account?",
        loginLink: "Log in here"
      },
      species: {
        title: "Fish Species",
        addSpeciesButton: "Add New Species",
        speciesNameHeader: "Species Name",
        actionsHeader: "Actions",
        editButton: "Edit",
        deleteButton: "Delete",
        noRecords: "No species! Add new species."
      },
      newSpecies: {
        title: "Add New Species",
        speciesNamePlaceholder: "Species Name",
        submitButton: "Add Species"
      },
      editSpecies: {
        title: "Edit Species",
        speciesNamePlaceholder: "Species Name",
        submitButton: "Save Changes"
      },
      fisheries: {
        title: "Fisheries",
        addFisheryButton: "Add New Fishery",
        fisheryNameHeader: "Fishery Name",
        fisheryTypeHeader: "Fishery Type",
        locationHeader: "Location",
        actionsHeader: "Actions",
        descriptionHeader: "Description",
        editButton: "Edit",
        deleteButton: "Delete",
        selectTypePlaceholder: "Select Fishery Type",
        noRecords: "No fisheries! Add new fishery."
      },
      detailsFishery: {
        title: "Fishery Details",
        fisheryNameHeader: "Fishery Name",
        fisheryTypeHeader: "Fishery Type",
        locationHeader: "Location",
        descriptionHeader: "Description",
        notFoundText: "Fishery not found.",
        backButton: "Back"
      },
      newFishery: {
        title: "Add New Fishery",
        fisheryNamePlaceholder: "Fishery Name",
        locationPlaceholder: "Location",
        submitButton: "Add Fishery"
      },
      editFishery: {
        title: "Edit Fishery",
        fisheryNamePlaceholder: "Fishery Name",
        locationPlaceholder: "Location",
        submitButton: "Save Changes"
      },
      catches: {
        title: "Catches",
        addCatchButton: "Add New Catch",
        dateHeader: "Date",
        weightHeader: "Weight (g)",
        speciesHeader: "Species",
        fisheryHeader: "Fishery",
        actionsHeader: "Actions",
        userHeader: "User",
        editButton: "Edit",
        deleteButton: "Delete",
        selectSpeciesPlaceholder: "Select Species",
        selectFisheryPlaceholder: "Select Fishery",
        noRecords: "No catches! Add new catch."
      },
      newCatch: {
        title: "Add New Catch",
        datePlaceholder: "Date",
        weightPlaceholder: "Weight (g)",
        speciesPlaceholder: "Species",
        fisheryPlaceholder: "Fishery",
        submitButton: "Add Catch"
      },
      editCatch: {
        title: "Edit Catch",
        datePlaceholder: "Date",
        weightPlaceholder: "Weight (g)",
        speciesPlaceholder: "Species",
        fisheryPlaceholder: "Fishery",
        submitButton: "Save Changes"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;