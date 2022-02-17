This challenge was completed using the logic that I built by the given sets of data I
was provided in the challenge.

The logic goes as:

Some keywords:
1DW = One value right with wrong index
1DR = One value right with right index
2DW = Two values right with wrong index
ADW = All values wrong

numberArray = To check the available options
wrongArray = To store the value which are not correct
rightArray = To store the correct value when it is found
rightIndexArray = To store the values's index as per the order of value found
correctArray = To find the correct value with it's proper index through right & rightIndexArray

In each comparision the values are removed from numberArray & added to either rightArray or wrongArray

Step 1) Created an array to store all the uniques number in numberArray
Step 2) Removing all the values from 2DW from the numberArray & store them in wrongArray
Step 3) Comparing values between 1DW & 1DR to get our first number without index
Step 4) Comparing values between 1DW & 2DW to get our first number's index
Step 5) After step 4 either 1 or 2 option from 2DW becomes viable. Either in both case 
        both options are compared to find the second value with its index
Step 6) Comparing the remaining values in numberArray to get the final value with its index
Step 7) Return the correctArray
