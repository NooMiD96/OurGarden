using System;
using System.Linq;
using System.Linq.Expressions;

namespace Core.LINQ
{
    public static class ExpressionsHelper
    {

        public static Expression<Func<T, bool>> And<T>(this Expression<Func<T, bool>> expressionOne, Expression<Func<T, bool>> expressionTwo)
        {
            //Basically this is like a bridge between the two expressions.  It will take the T
            //parameter from expressionOne and apply it to expression two. So if 
            // oneItem => oneItem.OneMethod() is expressionOne
            // twoItem => twoItem.TwoMethod() is expressionTwo
            //it would be like replacing the twoItem with the oneItem so that they now point
            //to the same thing.
            var invokedSecond = Expression.Invoke(expressionTwo, expressionOne.Parameters.Cast<Expression>());

            //Now this is to create the needed expresions to return.  It will take both early expressions
            //and use the item from the first expression in both.

            //It will look something like this:
            //currentItem => (currentItem.OneMethod And Invoke(currentItem => currentItem.TwoMethod()))
            //As you can see, it looks to be running expressionOne and then a new method that basically
            //calls expressionTwo with the same value (currentItem)
            return Expression.Lambda<Func<T, bool>>(Expression.And(expressionOne.Body, invokedSecond), expressionOne.Parameters);
        }

        public static Expression<Func<T, bool>> Or<T>(this Expression<Func<T, bool>> expressionOne,Expression<Func<T, bool>> expressionTwo)
        {
            var invokedSecond = Expression.Invoke(expressionTwo, expressionOne.Parameters.Cast<Expression>());

            return Expression.Lambda<Func<T, bool>>(Expression.Or(expressionOne.Body, invokedSecond), expressionOne.Parameters);
        }
    }
}
