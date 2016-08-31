//Module
var pokemonApp = angular.module('pokemonApp', []);


//Factory
pokemonApp.factory('allPokemon', function ($http) {
    var cachedData;

    //caching list of pokemon from JSON file
    return {
        getPokemon: function (callback) {
            if (cachedData) {
                callback(cachedData);
            } else {
                $http.get('pokemon.json').success(function (data) {
                    cachedData = data;
                    callback(data);
                })
            }
        }

    }

});


//Controller
pokemonApp.controller('resultsController', ['$scope',
    'allPokemon',
    function ($scope, allPokemon) {

        //Intializing 
        $scope.pokemonList = []; //list of pokemon the user has entered
        $scope.pokemon = "Choose Pokemon";
        allPokemon.getPokemon(function (allPokemon) {
            $scope.allPokemon = allPokemon;
        })


        console.log(JSON.stringify($scope.allPokemon));


        $scope.results = function () {
            //reset errors
            $scope.pokemonError = false;
            $scope.pokemonCountError = false;
            $scope.candyCountError = false;
            $scope.editMode = false;


            //Error Mesages for incorrect inputs
            if ($scope.pokemon === "Choose Pokemon")
                $scope.pokemonError = true;

            if (isNaN(parseInt($scope.pokemonCount)) || parseInt($scope.pokemonCount) < 0)
                $scope.pokemonCountError = true;

            if (isNaN(parseInt($scope.candyCount)) || parseInt($scope.candyCount) < 0)
                $scope.candyCountError = true;


            //if(!($scope.pokemonError && $scope.pokemonCountError)) NOT THE SAME!!

            //Adding their pokemon 
            if (!$scope.pokemonError && !$scope.pokemonCountError && !$scope.candyCountError) {
                $scope.pokemonList.push({
                    pokemon: $scope.pokemon.name,
                    candy: $scope.pokemon.candy,
                    pokemonCount: parseInt($scope.pokemonCount),
                    candyCount: parseInt($scope.candyCount)

                })


                //Remove Pokemon from dropdown list to prevent duplicates

                for (var i = 0; i < $scope.allPokemon.length; i++) {
                    if ($scope.allPokemon[i].name === $scope.pokemon.name) {
                        $scope.allPokemon[i].active = false;
                        break;
                    }
                }


                //$scope.allPokemon.splice($scope.allPokemon.indexOf($scope.pokemon),1);

                //Reset Inputs
                $scope.pokemon = "Choose Pokemon";
                $scope.pokemonCount = "";
                $scope.candyCount = "";
                $scope.editMode = false;
            }
        }


        $scope.deleteItem = function (index) {
            for (var i = 0; i < $scope.allPokemon.length; i++) {
                if ($scope.allPokemon[i].name === $scope.pokemonList[index].pokemon) {
                    $scope.allPokemon[i].active = true;
                    break;
                }
            }
            $scope.pokemonList.splice(index, 1);
        }

        $scope.calculate = function () {
            $scope.calculateList = [];


            var evolutionFunc = function () {
                $scope.evolutionCount = Math.floor($scope.pokemonList[i].candyCount / $scope.pokemonList[i].candy);

                //Eggs remaining + # of pokemon
                var temp = ($scope.pokemonList[i].candyCount % $scope.pokemonList[i].candy) + $scope.pokemonList[i].pokemonCount;

                if (temp >= $scope.pokemonList[i].candy) {

                    $scope.evolutionCount += Math.floor(temp / $scope.pokemonList[i].candy);
                    $scope.transferCount = $scope.pokemonList[i].pokemonCount - (temp % $scope.pokemonList[i].candy);

                }
            }


            for (var i = 0; i < $scope.pokemonList.length; i++) {
                //Reset
                $scope.transferCount = 0;
                $scope.evolutionCount = 0;
                //when calculate is clicked, the input field will disappear
                $scope.pokemonList[i].editMode = false;

                evolutionFunc();

                $scope.calculateList.push({

                    pokemon: $scope.pokemonList[i].pokemon,
                    evolutionCount: $scope.evolutionCount,
                    transferCount: $scope.transferCount

                })

            }

        }
}]);
