(function () {
    angular.module('FoodLover')
        .controller('SearchResultsController', SearchResultsController);

    function SearchResultsController(FoursquareSearchService, UserService, $routeParams, $location) {
        var vm = this;
        vm.id = $routeParams['id'];
        vm.name = $routeParams['name'];
        vm.city = $routeParams['city'];
        vm.userId = $routeParams['uid'];

        vm.getRestaurantDetails = getRestaurantDetails;
        vm.logout = logout;

        function init() {

            if (vm.userId) {
                UserService.findUserById(vm.userId)
                    .then(function (response) {
                        vm.user = response.data;
                        user = vm.user;
                    });
            }


            FoursquareSearchService
                .findRestaurantsByPlaceAndCity(vm.name, vm.city)
                .then(function (response) {
                    console.log(response.data);
                    vm.results = response.data.response.groups[0].items;
                }, function (err) {
                    console.log(err);
                });

            // FoursquareSearchService
            //     .findImage(id)
            //     .then(function (response) {
            //         console.log(response.data)
            //     })

        }

        init();

        function logout() {
            UserService.logout()
                .then(function (response) {
                    $location.url('/');
                });
        }

        function getRestaurantDetails(id) {
            if (vm.userId) {
                $location.url('/details/' + id + "/user/" + vm.userId);
            } else {
                $location.url('/details/' + id);
            }
        }



    }
})();