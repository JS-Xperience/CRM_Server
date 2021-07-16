import { Query, Resolver } from "type-graphql";

@Resolver()
class CustomerResolver {
  @Query(() => [String])
  getData(): any {
    return [];
  }
}

export default CustomerResolver;
