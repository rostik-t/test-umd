# Creating Component Library

The EHR Forms tool allows third-party developers to create their own component libraries, which can then be dynamically connected to the designer and used in the created forms.

Instructions for creating a new component library **\(relevant for the version of Angular 7.x\):**

1. Run command

   ```text
   ng new <library_project_name>
   ```

   \(Routing -&gt; no, style -&gt; SCSS\)  
  

2. Run command

   ```text
   ng generate library <library_name>
   ```

3. Add components to the library
4. To automate the build and upgrade, add the following scripts to package.json:

   ```text
       "prebuild-lib": "cd projects/<library_name> && npm version patch",
       "build-lib": "ng build <library_name>",
       "postbuild-lib": "cd dist/<library_name> && npm pack",
   ```

5. Add the following dependencies to the dev-dependencies of the package.json file

   ```text
   "devDependencies": {
     "@angular-devkit/build-angular": "^0.13.0",
     "@angular-devkit/build-ng-packagr": "^0.13.0",
     "@angular/cli": "^7.2.13",
     "@angular/compiler": "^7.2.13",
     "@angular/compiler-cli": "^7.2.13",
     "ng-packagr": "5.4.3",
     "tsickle": "^0.38.1",
     "tslib": "^1.11.1",
     "typescript": "^3.2.0"
   }
   ```

6. Assemble the library with the command

   ```text
   npm run build-lib
   ```

   Important

   The assembled library must be published in the repository from which library will be taken by final product.

7. As a result, you will get the file &lt;library\_name&gt; .tgz, which can be found in **the** **directory with the assembled library** \(usually located in the dist folder\).
8. Add the file &lt;library\_name&gt; .tgz to the EHR Forms on the corresponding page.

