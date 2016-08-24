//Module
var pokemonApp = angular.module('pokemonApp', []);

//Controller
pokemonApp.controller('resultsController', ['$scope', function($scope) {
    
    //Intializing 
    $scope.pokemonList = [];
    $scope.pokemon = "Choose Pokemon";
    
    
    $scope.candy12 = ['Weedle', 'Caterpie', 'Pidgey'];
    $scope.candy25 = ['Pikachu', 'Rattata', 'Oddish']
    $scope.candy50 = ['Goldeen', 'Zubat'];
    $scope.candy100 = ['Ivysaur'];
    
    $scope.results = function(){
        //reset
        $scope.pokemonError = false;
        $scope.pokemonCountError = false;
        $scope.candyCountError = false;
        
        
        //Error Mesages for incorrect inputs
        if($scope.pokemon === "Choose Pokemon")
            $scope.pokemonError = true;   
        
        if(isNaN(parseInt($scope.pokemonCount)) || parseInt($scope.pokemonCount) < 0)
            $scope.pokemonCountError = true;
        
        if(isNaN(parseInt($scope.candyCount)) || parseInt($scope.candyCount) < 0)
            $scope.candyCountError = true;
        
              
        //if(!($scope.pokemonError && $scope.pokemonCountError)) NOT THE SAME!!
        if(!$scope.pokemonError && !$scope.pokemonCountError && !$scope.candyCountError){
            $scope.pokemonList.push({
                pokemon: $scope.pokemon,
                pokemonCount: parseInt($scope.pokemonCount),
                candyCount: parseInt($scope.candyCount)

            })

            //Reset Inputs
            $scope.pokemon = "Choose Pokemon";
            $scope.pokemonCount = "";
            $scope.candyCount = "";
        }
        
    }
        
    $scope.deleteItem = function(index) {
        $scope.pokemonList.splice(index, 1);   
        
        
    }   
            
     $scope.calculate = function() {
        //Reset
         $scope.calculateList = [];
         $scope.transferCount = 0;
         $scope.evolutionCount = 0;
         
         var evolutionFunc = function(candy){            
            $scope.evolutionCount = Math.floor($scope.pokemonList[i].candyCount / candy);
            
            //Eggs remaining + # of pokemon
            var temp = ($scope.pokemonList[i].candyCount % candy) + $scope.pokemonList[i].pokemonCount;
            
            if(temp >= candy){
                
                $scope.evolutionCount += Math.floor(temp / candy);
                $scope.transferCount = $scope.pokemonList[i].pokemonCount - (temp % candy);
                
            }
        }
        
                
        for(var i = 0; i < $scope.pokemonList.length; i++)
        {
            if($scope.candy12.indexOf($scope.pokemonList[i].pokemon) > -1)
            {
                evolutionFunc(12);
                
            } else if($scope.candy25.indexOf($scope.pokemonList[i].pokemon) > -1){
                
                 evolutionFunc(25);   
            } else if($scope.candy50.indexOf($scope.pokemonList[i].pokemon) > -1){
                
                 evolutionFunc(50);   
            } else if($scope.candy100.indexOf($scope.pokemonList[i].pokemon) > -1){
                
                evolutionFunc(100);   
            } else {
                evolutionFunc(400);          
            }
            
            $scope.calculateList.push({

                pokemon: $scope.pokemonList[i].pokemon,
                evolutionCount: $scope.evolutionCount,
                transferCount: $scope.transferCount
                
            })
            
        }
            
    }
}]);