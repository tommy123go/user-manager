var myApp = angular.module("myApp", []);

myApp.controller("userCtrl", [
  "$scope",
  "$http",

  function ($scope, $http) {
    $scope.editablerow = "";
    $scope.addModal = "add-modal.html";
    $scope.editModal = "edit-modal.html";
    $scope.searchText = "";
    $scope.id = null;
    $scope.name = null;
    $scope.address = null;
    $scope.phone = null;
    $scope.email = null;
    $scope.user = {
      id: $scope.id,
      name: $scope.name,
      address: $scope.address,
      phone: $scope.phone,
      email: $scope.email,
    };

    $http({
      method: "GET",
      url: "http://localhost:3000/api/users",
    }).then(
      function mySuccess(response) {
        var users = response.data;
        $scope.users = users;
      },
      function myError(response) {
        $scope.users = response.statusText;
      }
    );

    // Post user data

    $scope.postdata = function (id, name, address, phone, email) {
      var data = {
        id: id,
        name: name,
        address: address,
        phone: phone,
        email: email,
      };
      console.log(data);
      $http({
        withCredentials: false,
        method: "POST",
        url: "http://localhost:3000/api/users",
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify(data),
      });
    };

    // put data
    $scope.editContent = function (content) {
      console.log(content);
      $scope.editablerow = angular.copy(content);
    };

    $scope.openDialog = function () {
      $scope.user = {};
      $("#add").modal("show");
    };

    $scope.updateUser = function (id, name, address, phone, email) {
      var data = {
        id: id,
        name: name,
        address: address,
        phone: phone,
        email: email,
      };
      $http({
        withCredentials: false,
        method: "PUT",
        url: `http://localhost:3000/api/users/${id}`,
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify(data),
      });
    };

    // delete user
    $scope.deleteUser = function (id) {
      var data = {
        id: id,
      };
      $http({
        withCredentials: false,
        method: "DELETE",
        url: `http://localhost:3000/api/users/${id}`,
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify(data),
      });
    };
  },
]);
