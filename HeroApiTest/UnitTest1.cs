using HeroApi.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace HeroApiTest
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void TestMethod1()
        {
            Hero hero = new Hero();
            Assert.IsNotNull(hero);
        }
    }
}
